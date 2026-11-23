import { apiClient } from '@/shared/api/client'
import { createApiError } from '@shared/api/apiError'
import type { operations } from '@/shared/api/types'

export type PostLikesModel =
  operations['PostsController_getLikes']['responses'][200]['content']['application/json']

export const getPostLikes = async (postId: number) => {
  const { data, error, response } = await apiClient.GET('/api/v1/posts/{postId}/likes', {
    params: {
      path: { postId },
    },
  })
  if (!response.ok) throw createApiError(response.status, error)
  if (!data) throw createApiError(response.status, null)
  return data
}
