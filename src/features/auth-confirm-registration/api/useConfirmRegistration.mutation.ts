import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@shared/api/client'
import type { components } from '@shared/api/types'
import { createApiError } from '@shared/api/apiError'

export type ConfirmationCodeDto = components['schemas']['ConfirmationCodeInputDto']

export const useConfirmRegistration = () => {
  return useMutation({
    mutationFn: async (data: ConfirmationCodeDto): Promise<void> => {
      const { error, response } = await apiClient.POST('/api/v1/auth/registration-confirmation', {
        body: data,
      })

      if (!response.ok) throw createApiError(response.status, error)
    },
  })
}
