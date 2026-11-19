import { createApiError } from '@shared/api/apiError'
import { apiClient } from '@shared/api/client'
import { PostsPage } from '../model/types'

const PAGE_SIZE = 8
/** первая страница главной — 4 поста (спека C-1), дальше — пачками по 8 */
const FIRST_PAGE_SIZE = 4

/*
  Публичная лента для главной. Используем /public-posts/all, а не /posts/all:
  /posts/all с Authorization-токеном отдаёт персонализированную ленту
  (у пользователя с 2 своими постами totalCount = 2 и следующие страницы пустые),
  из-за чего пагинация на главной ломалась. Публичный эндпоинт токен игнорирует.
*/
export const getAllPosts = async (offset: number) => {
  const pageSize = offset === 0 ? FIRST_PAGE_SIZE : PAGE_SIZE

  const { data, error, response } = await apiClient.GET(
    '/api/v1/public-posts/all/{endCursorPostId}',
    {
      params: {
        path: { endCursorPostId: offset }, // id последнего поста предыдущей пачки
        query: {
          pageSize: pageSize + 1,
          sortBy: 'id',
          sortDirection: 'desc',
        },
      },
    },
  )

  if (!response.ok) throw createApiError(response.status, error)
  if (!data) throw createApiError(response.status, null)

  const page = data as PostsPage
  return { ...page, items: page.items?.slice(0, pageSize) ?? [] }
}
