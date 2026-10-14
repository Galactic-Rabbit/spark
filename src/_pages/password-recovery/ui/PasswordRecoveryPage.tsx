import { AuthFormWrapper } from '@shared/ui/AuthFormWrapper'
import { PasswordRecoveryForm } from '@features/auth-recovery-password'


export const PasswordRecoveryPage = () => {
  return (
    <AuthFormWrapper>
        <PasswordRecoveryForm />
    </AuthFormWrapper>
  )
}
