import { AuthFormWrapper } from '@/features/auth/components/AuthFormWrapper'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'

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
