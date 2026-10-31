import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@shared/api/client'
import type { components } from '@shared/api/types'
import { createApiError } from '@shared/api/apiError'

export type RegistrationDto = Omit<components['schemas']['RegisterInputDto'], 'baseUrl'>

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: RegistrationDto): Promise<void> => {
      const { error, response } = await apiClient.POST('/api/v1/auth/registration', {
        body: {
          ...data,
          baseUrl: `${window.location.origin}/registration-confirmation`, //window.location.origin считывает url где юзер, будет работать и у нас на локалхост и на домене
        },
      })

      if (!response.ok) throw createApiError(response.status, error)
    },
  })
}
