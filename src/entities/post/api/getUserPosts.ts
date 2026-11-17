import { createApiError } from '@shared/api/apiError'
import { apiClient } from '@shared/api/client'
import type { PostsPage } from '../model/types'

// размер пачки (в запрос уходит на 1 больше — см. ниже)
const PAGE_SIZE = 8

export const getUserPosts = async (userId: number, endCursorPostId: number) => {
  // Бэк на страницах с курсором отдаёт на 1 пост меньше запрошенного pageSize
  // (вырезает сам пост-курсор из ответа). Поэтому запрашиваем PAGE_SIZE + 1 и режем
  // до PAGE_SIZE.
  const { data, error, response } = await apiClient.GET(
    '/api/v1/posts/user/{userId}/{endCursorPostId}',
    {
      params: {
        path: { userId, endCursorPostId },
        query: { pageSize: PAGE_SIZE + 1 },
      },
    },
  )
  if (!response.ok) throw createApiError(response.status, error)
  if (!data) throw createApiError(response.status, null)
  // в сваггере у /posts/user не описан ответ (content?: never) — тип задаём руками
  const page = data as PostsPage
  return { ...page, items: page.items.slice(0, PAGE_SIZE) }
}
