import { ForgotPasswordForm } from '@/features/auth-forgot-password'
import { AuthFormWrapper } from '@/shared/ui/AuthFormWrapper'

type Props = {
  siteKey: string
}
export const ForgotPasswordPage = ({ siteKey }: Props) => {
  return (
    <AuthFormWrapper>
      <ForgotPasswordForm siteKey={siteKey} />
    </AuthFormWrapper>
  )
}
