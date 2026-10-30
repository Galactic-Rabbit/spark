import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@shared/api/client'
import type { components } from '@shared/api/types'

export type ConfirmationCodeDto = components['schemas']['ConfirmationCodeInputDto']

export const useConfirmRegistration = () => {
  return useMutation({
    mutationFn: async (data: ConfirmationCodeDto): Promise<void> => {
      const { error } = await apiClient.POST('/api/v1/auth/registration-confirmation', {
        body: data,
      })

      if (error) throw error
    },
  })
}
