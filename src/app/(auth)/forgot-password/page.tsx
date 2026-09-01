import {ForgotPasswordPage} from '@/screens/ForgotPasswordPage'

export default function ForgotPassword() {
  // Server component — reads both envs:
  // - local: (test 6LeIxAcT...)
  // - prod: RECAPTCHA_SITE_KEY from backend (without NEXT_PUBLIC_) — server only
  // Pass via prop, client does not read process.env directly
  const siteKey = process.env.RECAPTCHA_SITE_KEY ?? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  return <ForgotPasswordPage siteKey={siteKey}/>
}
