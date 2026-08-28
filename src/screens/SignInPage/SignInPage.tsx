import { AuthFormWrapper } from '@/features/auth/components/AuthFormWrapper'
import { LoginForm } from '@/features/auth/components/LoginForm'

export const SignInPage = () => {
  return (
    <AuthFormWrapper>
      <LoginForm />
    </AuthFormWrapper>
  )
}
