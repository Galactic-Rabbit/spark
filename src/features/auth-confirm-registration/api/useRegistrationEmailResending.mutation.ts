import { useMutation } from '@tanstack/react-query'
import { registrationEmailResendingRequest } from './registrationEmailResending'

export const useRegistrationEmailResending = () => {
  return useMutation({
    mutationFn: registrationEmailResendingRequest,
  })
}
