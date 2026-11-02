import { createApiError } from '@shared/api/apiError'
import { apiClient } from '@shared/api/client'
import { PostsPage } from '../model/types'

export const getAllPosts = async (endCursorPostId: number) => {
  const { data, error, response } = await apiClient.GET('/api/v1/posts/all/{endCursorPostId}', {
    params: { path: { endCursorPostId } },
  })
  if (!response.ok) throw createApiError(response.status, error)
  if (!data) throw createApiError(response.status, null)
  // в сваггере у /posts/all не описан ответ (content?: never) — тип задаём руками
  return data as PostsPage
}
