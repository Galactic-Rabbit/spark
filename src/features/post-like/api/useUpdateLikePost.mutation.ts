import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@shared/api/client'
import { createApiError } from '@shared/api/apiError'
import { components } from '@shared/api/types'

type LikeStatusData = components['schemas']['UpdateLikeStatusDto']
type LikeStatusPayload = LikeStatusData & { postId: number }

export const useUpdateLikePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ postId, likeStatus }: LikeStatusPayload) => {
      const { error, response } = await apiClient.PUT('/api/v1/posts/{postId}/like-status', {
        params: { path: { postId } },
        body: { likeStatus },
      })
      if (!response.ok) throw createApiError(response.status, error)
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user-posts'] }),
        queryClient.invalidateQueries({ queryKey: ['posts'] }),
      ])
    },
  })
}
