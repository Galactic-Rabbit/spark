import { LoginForm } from '@/features/auth-login'
import { AuthFormWrapper } from '@/shared/ui/AuthFormWrapper'

export const SignInPage = () => {
  return (
    <AuthFormWrapper>
      <LoginForm />
    </AuthFormWrapper>
  )
}
