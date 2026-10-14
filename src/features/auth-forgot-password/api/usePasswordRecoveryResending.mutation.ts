import { components } from '@shared/api/types'
import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@shared/api/client'

type RecoveryData = components['schemas']['PasswordRecoveryResendingInputDto']


export const usePasswordRecoveryResendingMutation = () => {
  return useMutation({
    mutationFn: async ({ email, baseUrl }: RecoveryData) => {
      const { data, error } = await apiClient.POST('/api/v1/auth/password-recovery-resending', {
        body: {
          email,
          baseUrl,
        },
      })
      if (error) throw error
      return data
    },
  })
}
