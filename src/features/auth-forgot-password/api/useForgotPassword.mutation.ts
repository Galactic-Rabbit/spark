import { authStorage } from '@/shared/api/authStorage'
import { apiClient } from '@/shared/api/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type RecoveryData = {
  email: string
  recaptchaToken: string
}

export const useForgotPasswordMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ email, recaptchaToken }: RecoveryData) => {
      const { data, error } = await apiClient.POST('/api/auth/password-recovery', {
        body: {
          email,
          recaptchaToken,
        },
      })
      if (error) throw error
    },
  })
}
