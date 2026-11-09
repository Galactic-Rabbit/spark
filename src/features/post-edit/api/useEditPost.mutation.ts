import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@shared/api/client'
import { createApiError } from '@shared/api/apiError'
import { components } from '@shared/api/types'

type EditPostData = components['schemas']['UpdatePostInputDto']
type EditPostPayload = EditPostData & { postId: number }

export const useEditPostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ description, postId }: EditPostPayload) => {
      const { error, response } = await apiClient.PUT('/api/v1/posts/{postId}', {
        params: { path: { postId } },
        body: {
          description,
        },
      })
      if (!response.ok) throw createApiError(response.status, error)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
