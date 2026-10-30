import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@shared/api/client'
import type { components } from '@shared/api/types'

export type RegistrationEmailResendingInputDto =
  components['schemas']['RegistrationEmailResendingInputDto']

export const useRegistrationEmailResending = () => {
  return useMutation({
    mutationFn: async (data: RegistrationEmailResendingInputDto): Promise<void> => {
      const { error } = await apiClient.POST('/api/v1/auth/registration-email-resending', {
        body: {
          ...data,
          baseUrl: `${window.location.origin}/registration-confirmation`,
        },
      })

      if (error) throw error
    },
  })
}
