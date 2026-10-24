import { ForgotPasswordForm } from '@/features/auth-forgot-password'
import { AuthFormWrapper } from '@/shared/ui/AuthFormWrapper'


export const ForgotPasswordPage = () => {
  return (
    <AuthFormWrapper>
      <ForgotPasswordForm />
    </AuthFormWrapper>
  )
}
