import { createApiError, getApiErrorMessage, isApiError } from '@shared/api/apiError'
import { PostsPage } from '../model/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export type LatestPostsResult = {
  posts: PostsPage['items']
  totalUsers: number
  error: string | null // null = ошибки нет
}

export const getLatestPosts = async (pageSize: number): Promise<LatestPostsResult> => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/public-post/all/0?pageSize=${pageSize}&sortBy=id&sortDirection=desc`,
      { next: { revalidate: 60 } },
    )

    // Если ответ не ок — парсим ошибку через твою утилиту
    if (!res.ok) {
      // Пытаемся достать тело ошибки (иногда бэк отдает пустоту при 500)
      let errorBody = null
      try {
        errorBody = await res.json()
      } catch {
        // Игнорируем ошибку парсинга JSON (например, если сервер вернул пустую страницу)
      }

      throw createApiError(res.status, errorBody)
    }

    const data = (await res.json()) as PostsPage
    if (!Array.isArray(data.items))
      throw new Error('Failed to fetch latest posts: unexpected payload')

    // Успешный ответ (даже если posts пустой — это не ошибка)
    return { posts: data.items, totalUsers: data.totalUsers, error: null }
  } catch (e) {
    // Логируем ошибку на сервере (чтобы разработчик видел в консоли при next build)
    console.error('[getLatestPosts] Posts loading error:', e)

    // Сообщение для пользователя: у ApiError уже человекочитаемый текст из apiError,
    // для сетевых ошибок (fetch failed) подставляем стандартный текст «сервер недоступен».
    const errorMessage = isApiError(e) ? e.message : getApiErrorMessage(503, null)

    // Возвращаем fallback, но с флагом ошибки, чтобы не ронять сборку
    return {
      posts: [],
      totalUsers: 0,
      error: errorMessage,
    }
  }
}
