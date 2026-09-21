import { RegisterForm } from '@/features/auth-register'
import { AuthFormWrapper } from '@/shared/ui/AuthFormWrapper'

export const SignUpPage = () => {
  return (
    <AuthFormWrapper>
      <RegisterForm />
    </AuthFormWrapper>
  )
}
