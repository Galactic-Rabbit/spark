import { authStorage } from '@/shared/api/authStorage'
import { apiClient } from '@/shared/api/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { components } from '@shared/api/types'

type LoginArgs = components['schemas']['LoginInputDto']

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ email, password }: LoginArgs) => {
      const { data, error } = await apiClient.POST('/api/v1/auth/login', {
        body: {
          email,
          password,
        },
      })
      if (error) throw error
      if (!data) throw new Error('Ошибка авторизации') //обработка если data - undefined
      return data
    },
    onSuccess: async (data) => {
      await authStorage.saveAccessToken(data.accessToken)
      await queryClient.invalidateQueries()
    },
  })
}
