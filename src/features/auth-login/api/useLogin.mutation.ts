import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authStorage } from '@shared/api/authStorage'
import { apiClient } from '@shared/api/client'
import type { components } from '@shared/api/types'
import { createApiError } from '@shared/api/apiError'


type LoginArgs = components['schemas']['LoginInputDto']

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ email, password }: LoginArgs) => {
      const { data, error, response } = await apiClient.POST('/api/v1/auth/login', {
        body: {
          email,
          password,
        },
      })
      if (!response.ok) throw createApiError(response.status, error)
      if (!data) throw createApiError(response.status, null)
      return data
    },
    onSuccess: async (data) => {
      await authStorage.saveAccessToken(data.accessToken)
      await queryClient.invalidateQueries()
    },
  })
}
