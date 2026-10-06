import { apiClient } from '@/shared/api/client'
import { components } from '@/shared/api/types'

export type RegistrationDto = Omit<components['schemas']['RegisterInputDto'], 'baseUrl'>

export const signUpRequest = async (data: RegistrationDto): Promise<void> => {
  const { error } = await apiClient.POST('/api/v1/auth/registration', {
    body: {
      ...data,
      baseUrl: `${window.location.origin}/registration-confirmation`, //window.location.origin считывает url где юзер, будет работаь и у нас на локалхост и на домене
    },
  })

  if (error) throw error
}
