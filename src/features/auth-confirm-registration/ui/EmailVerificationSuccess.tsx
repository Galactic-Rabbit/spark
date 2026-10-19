'use client'

import Link from 'next/link'
import { Button } from '@shared/ui/Button'
import { EmailVerificationSuccessImage } from '@shared/ui/icons'
import s from './EmailVerification.module.css'

export const EmailVerificationSuccess = () => {
  return (
    <section className={s.container}>
      <div className={s.content}>
        <h1 className={s.title}>Congratulations!</h1>

        <p className={s.description}>Your email has been confirmed</p>

        <Button as={Link} href="/login" variant="primary">
          Sign In
        </Button>

        <div className={s.imageWrapper}>
          <EmailVerificationSuccessImage />
        </div>
      </div>
    </section>
  )
}
