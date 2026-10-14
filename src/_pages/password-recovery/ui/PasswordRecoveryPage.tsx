import { Suspense } from 'react'
import { AuthFormWrapper } from '@shared/ui/AuthFormWrapper'
import { PasswordRecoveryForm } from '@features/auth-recovery-password'

export const PasswordRecoveryPage = () => {
  return (
    <AuthFormWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <PasswordRecoveryForm />
      </Suspense>
    </AuthFormWrapper>
  )
}
