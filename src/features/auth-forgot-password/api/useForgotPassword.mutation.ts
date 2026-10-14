
import { apiClient } from '@/shared/api/client'
import { components } from '@/shared/api/types'
import { useMutation} from '@tanstack/react-query'
type ForgotData = components['schemas']['PasswordRecoveryInputDto']
type ForgotPayload =ForgotData & {baseUrl: string}

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async ({ email, recaptcha, baseUrl }: ForgotPayload) => {
      const { data, error } = await apiClient.POST('/api/v1/auth/password-recovery', {
        body: {
          email,
          recaptcha,
          baseUrl
        },
      })
      if (error) throw error
      return data
    },
  })
}
