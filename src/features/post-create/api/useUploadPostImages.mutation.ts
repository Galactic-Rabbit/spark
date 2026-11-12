import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@shared/api/client'
import { createApiError } from '@shared/api/apiError'
import type { paths } from '@shared/api/types'

type UploadImageBody = NonNullable<
  paths['/api/v1/posts/image']['post']['requestBody']
>['content']['multipart/form-data']

export const useUploadPostImagesMutation = () => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData()

      files.forEach((file) => {
        formData.append('file', file)
      })

      const { data, error, response } = await apiClient.POST('/api/v1/posts/image', {
        body: formData as unknown as UploadImageBody,
        bodySerializer: (body) => body as FormData,
      })

      if (!response.ok) {
        throw createApiError(response.status, error)
      }

      return data
    },
  })
}
