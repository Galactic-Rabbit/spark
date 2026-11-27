import { apiClient } from '@shared/api/client'
import { createApiError } from '@shared/api/apiError'

export const followUserFn = async (selectedUserId: number) => {
  const { error, response } = await apiClient.POST('/api/v1/users/following', {
    body: { selectedUserId },
  })
  if (!response.ok) throw createApiError(response.status, error)
}

export const unfollowUserFn = async (userId: number) => {
  const { error, response } = await apiClient.DELETE('/api/v1/users/follower/{userId}', {
    params: { path: { userId } },
  })
  if (!response.ok) throw createApiError(response.status, error)
}
