import { authStorage } from '@/shared/api/authStorage'
import { apiClient } from '@/shared/api/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type LoginArgs = {
  email: string
  password: string
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ email, password }: LoginArgs) => {
      const { data, error } = await apiClient.POST('/api/auth/login', {
        body: {
          email,
          password,
        },
      })
      if (error) throw error
      return data
    },
    onSuccess: async (data) => {
      await authStorage.saveAccessToken(data.accessToken)
      await queryClient.invalidateQueries()
    },
  })
}
