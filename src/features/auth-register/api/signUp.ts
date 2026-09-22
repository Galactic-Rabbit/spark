import { apiClient } from '@/shared/api/client'

export type RegistrationDto = {
  userName: string
  email: string
  password: string
  passwordConfirmation: string
  firstName?: string
  lastName?: string
}

export const signUpRequest = async (data: RegistrationDto): Promise<void> => {
  const { error } = await apiClient.POST('/api/auth/registration', {
    body: {
      ...data,
      firstName: '',
      lastName: '',
    },
  })

  if (error) throw error
}
