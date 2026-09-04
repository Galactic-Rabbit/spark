import { authStorage } from '@/shared/api/authStorage'
import type { paths } from '@/shared/api/types'
import { Mutex } from 'async-mutex'
import createClient, { type Middleware } from 'openapi-fetch'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

//Типизацию не указывал пока что, по сути нужно по беку создать схему и засунуть сюда как в paths,
// и тогда когда клиент будет видеть какой-то endpoint, он сразу будет знать что может/или должно прийти
export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
})

//Нужен для того чтобы лочить параллельные запросы, к примеру ситуация: У нас летит несколько запросов с протухшим токеном =>
//будем обновлять токен,
const mutex = new Mutex()

//Функция, которая будет рефрешить токен, запрос не через клиент, чтобы не было рекурсии, credentials включены,
// чтобы бек смог считать refreshToken из куков, но пока рабочего ендпоинта нет, будет такая заглушка на будущее
async function refreshTokens(): Promise<string | null> {
  const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    return null
  }

  const { accessToken } = await response.json()
  await authStorage.saveAccessToken(accessToken)
  return accessToken
}

//Функция перезапроса, если токен протух, чтобы пользователь получил свои данные сразу после того как произошла 401 ошибка
async function retryWithToken(request: Request, token: string) {
  const retryRequest = new Request(request)
  retryRequest.headers.set('Authorization', `Bearer ${token}`)
  return fetch(retryRequest)
}

const authMiddleware: Middleware = {
  //По сути interceptor как в axios, что будет добавляться при каждом запросе
  async onRequest({ request }) {
    await mutex.waitForUnlock()
    const token = await authStorage.getAccessToken()
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }
    return request
  },
  //Тут наоборот, будем что-то делать при response, конкретно здесь если пользователь авторизован всё ОК!, если нет обновляем токен и делаем перезапрос
  async onResponse({ request, response }) {
    if (response.status !== 401) return response

    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const newToken = await refreshTokens()
        if (newToken) {
          return await retryWithToken(request, newToken)
        }
        await authStorage.clearTokens()
        return response
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      const newToken = await authStorage.getAccessToken()
      if (newToken) {
        return await retryWithToken(request, newToken)
      }
      return response
    }
  },
}
