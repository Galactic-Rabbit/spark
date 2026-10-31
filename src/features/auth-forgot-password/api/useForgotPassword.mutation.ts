import { useMutation } from '@tanstack/react-query'
import { createApiError } from '@shared/api/apiError'
import { apiClient } from '@shared/api/client'
import { components } from '@shared/api/types'

type ForgotData = components['schemas']['PasswordRecoveryInputDto']
type ForgotPayload = ForgotData & { baseUrl: string }

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async ({ email, recaptcha, baseUrl }: ForgotPayload) => {
      const { error, response } = await apiClient.POST('/api/v1/auth/password-recovery', {
        body: {
          email,
          recaptcha,
          baseUrl,
        },
      })
      if (!response.ok) throw createApiError(response.status, error)
    },
  })
}
