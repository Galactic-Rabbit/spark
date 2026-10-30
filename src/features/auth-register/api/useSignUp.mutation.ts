import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@shared/api/client'
import type { components } from '@shared/api/types'

export type RegistrationDto = Omit<components['schemas']['RegisterInputDto'], 'baseUrl'>

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: RegistrationDto): Promise<void> => {
      const { error } = await apiClient.POST('/api/v1/auth/registration', {
        body: {
          ...data,
          baseUrl: `${window.location.origin}/registration-confirmation`, //window.location.origin считывает url где юзер, будет работать и у нас на локалхост и на домене
        },
      })

      if (error) throw error
    },
  })
}
