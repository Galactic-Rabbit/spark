import { useMutation } from '@tanstack/react-query'
import { confirmRegistrationRequest } from './confirmRegistration'

export const useConfirmRegistration = () => {
  return useMutation({
    mutationFn: confirmRegistrationRequest,
  })
}
