'use client'

import EmailVerificationSuccessImage from '@/components/icons/EmailVerificationImages/EmailVerificationSuccessImage'
import { Button } from '@/components/ui/Button'
import s from './EmailVerification.module.css'

export const EmailVerificationSuccess = () => {
  const handleSignIn = () => {
    console.log('Redirect to Sign In')
  }

  return (
    <section className={s.container}>
      <div className={s.content}>
        <h1 className={s.title}>Congratulations!</h1>

        <p className={s.description}>Your email has been confirmed</p>

        <Button onClick={handleSignIn} className={s.button}>
          Sign In
        </Button>

        <div className={s.imageWrapper}>
          <EmailVerificationSuccessImage />
        </div>
      </div>
    </section>
  )
}
