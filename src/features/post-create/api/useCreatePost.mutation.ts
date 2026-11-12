import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@shared/api/client'
import { createApiError } from '@shared/api/apiError'
import { components } from '@shared/api/types'

type CreatePostData = components['schemas']['CreatePostInputDto']

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreatePostData) => {
      const { error, response } = await apiClient.POST('/api/v1/posts', {
        body: data,
      })

      if (!response.ok) {
        throw createApiError(response.status, error)
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
  })
}
