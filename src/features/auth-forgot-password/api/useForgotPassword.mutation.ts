import { authStorage } from '@/shared/api/authStorage'
import { apiClient } from '@/shared/api/client'
import { components } from '@/shared/api/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type RecoveryData = components['schemas']['PasswordRecoveryInputDto']

export const useForgotPasswordMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ email, recaptcha }: RecoveryData) => {
      const { data, error } = await apiClient.POST('/api/v1/auth/password-recovery', {
        body: {
          email,
          recaptcha,
        },
      })
      if (error) throw error
    },
  })
}
