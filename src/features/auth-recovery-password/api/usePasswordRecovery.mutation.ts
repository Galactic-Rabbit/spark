import { useMutation } from '@tanstack/react-query'
import { createApiError } from '@shared/api/apiError'
import { apiClient } from '@shared/api/client'
import { components } from '@shared/api/types'

type RecoveryData = components['schemas']['NewPasswordInputDto']

export const usePasswordRecoveryMutation = () => {
  return useMutation({
    mutationFn: async ({ newPassword, recoveryCode }: RecoveryData) => {
      const { error, response } = await apiClient.POST('/api/v1/auth/new-password', {
        body: {
          newPassword,
          recoveryCode,
        },
      })
      if (!response.ok) throw createApiError(response.status, error)
    },
  })
}
