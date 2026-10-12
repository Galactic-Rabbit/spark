'use client'

import s from './EmailVerification.module.css'
import { EmailVerificationSuccessImage } from '@shared/ui/icons'
import Link from 'next/link'

export const EmailVerificationSuccess = () => {
  return (
    <section className={s.container}>
      <div className={s.content}>
        <h1 className={s.title}>Congratulations!</h1>

        <p className={s.description}>Your email has been confirmed</p>

        <Link href="/login">Sign In</Link>

        <div className={s.imageWrapper}>
          <EmailVerificationSuccessImage />
        </div>
      </div>
    </section>
  )
}
