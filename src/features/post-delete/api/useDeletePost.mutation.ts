import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@shared/api/client'
import { createApiError } from '@shared/api/apiError'

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (postId: number) => {
      const { error, response } = await apiClient.DELETE('/api/v1/posts/{postId}', {
        params: { path: { postId } },
      })
      if (!response.ok) throw createApiError(response.status, error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
