import { ConfirmRegistration } from '@features/auth-confirm-registration'
import { Suspense } from 'react'

export const RegistrationConfirmationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmRegistration />
    </Suspense>
  )
}
