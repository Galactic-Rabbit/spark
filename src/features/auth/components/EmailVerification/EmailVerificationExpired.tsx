'use client'

import EmailVerificationExpiredImage from '@/components/icons/EmailVerificationImages/EmailVerificationExpiredImage'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import s from './EmailVerification.module.css'

export const EmailVerificationExpired = () => {
  const handleSignIn = () => {
    console.log('Resend verification link')
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1 className={s.title}>Email verification link expired</h1>

        <p className={s.description}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>

        <div className={s.inputWrapper}>
          <Input label="Email" variant="text" placeholder={'Epam@epam.com'} />
        </div>

        <Button className={s.button} onClick={handleSignIn}>
          Resend verification link
        </Button>

        <div className={s.imageWrapper}>
          <EmailVerificationExpiredImage />
        </div>
      </div>
    </div>
  )
}
