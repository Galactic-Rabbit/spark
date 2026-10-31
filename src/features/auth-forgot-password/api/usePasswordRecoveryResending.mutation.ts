import { useMutation } from '@tanstack/react-query'
import { createApiError } from '@shared/api/apiError'
import { apiClient } from '@shared/api/client'
import { components } from '@shared/api/types'

type RecoveryData = components['schemas']['PasswordRecoveryResendingInputDto']

export const usePasswordRecoveryResendingMutation = () => {
  return useMutation({
    mutationFn: async ({ email, baseUrl }: RecoveryData) => {
      const { error, response } = await apiClient.POST('/api/v1/auth/password-recovery-resending', {
        body: {
          email,
          baseUrl,
        },
      })
      if (!response.ok) throw createApiError(response.status, error)
    },
  })
}
