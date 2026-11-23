import { authStorage } from '@/shared/api/authStorage'
import type { paths } from '@/shared/api/types'
import { Mutex } from 'async-mutex'
import createClient, { type Middleware } from 'openapi-fetch'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
  credentials: 'include',
})

const mutex = new Mutex()

async function refreshTokens(): Promise<string | null> {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/update`, {
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

// Сохраняем копии запросов до отправки
const retryRequests = new WeakMap<Request, Request>()

async function retryWithToken(request: Request, token: string) {
  request.headers.set('Authorization', `Bearer ${token}`)
  return fetch(request)
}

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    await mutex.waitForUnlock()

    const token = await authStorage.getAccessToken()

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }

    // Клонируем запрос до использования его тела
    retryRequests.set(request, request.clone())

    return request
  },

  async onResponse({ request, response }) {
    if (response.status !== 401) {
      return response
    }

    const retryRequest = retryRequests.get(request)

    if (!retryRequest) {
      return response
    }

    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const newToken = await refreshTokens()

        if (newToken) {
          // Используем сохранённую копию запроса
          return await retryWithToken(retryRequest, newToken)
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
        // Используем сохранённую копию запроса
        return await retryWithToken(retryRequest, newToken)
      }

      return response
    }
  },
}

apiClient.use(authMiddleware)
