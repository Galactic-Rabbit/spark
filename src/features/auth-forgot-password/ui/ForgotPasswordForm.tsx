'use client'
import { useState } from 'react'
import { Input } from '@shared/ui/Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shared/ui/Button'
import s from './ForgotPassword.module.css'

import { useRouter } from 'next/navigation'
import { ReCaptchaWidget } from '@shared/ui/ReCaptchaWidget'
import { useForgotPasswordMutation } from '../api/useForgotPassword.mutation'
import { ForgotPasswordValues, forgotPasswordSchema } from '../model/forgotPassword.schema'
import { Modal } from '@shared/ui/Modal'
import {
  usePasswordRecoveryResendingMutation
} from '@features/auth-forgot-password/api/usePasswordRecoveryResending.mutation'

export const ForgotPasswordForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [modal, setModal] = useState(false)
  const [sendEmailAgain, setSendEmailAgain] = useState(false)
  const { mutateAsync: forgotPassword } = useForgotPasswordMutation()
  const { mutateAsync: recoveryResending } = usePasswordRecoveryResendingMutation()
  const router = useRouter()

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    control: emailControl,
    reset,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: { email: '', recaptchaToken: '' },
  })

  const onEmailSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    setError(null)
    try {
      if (!sendEmailAgain) {
        await forgotPassword({
          email: data.email,
          recaptcha: data.recaptchaToken,
          baseUrl: `${window.location.origin}/password-recovery`,
        })
        setSendEmailAgain(true)
        setModal(true)
      } else {
        await recoveryResending({
          email: data.email,
          baseUrl: `${window.location.origin}/password-recovery`,
        })
      }
    } catch (e) {
      reset({ recaptchaToken: '' })
      console.log(e, '----------12132')
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    }
  }

  const handleSignIn = () => {
    router.push('/login')
  }

  return (
    <>
      {
        <div className={s.container}>
          <h1 className={`text-h1`}>Forgot Password</h1>
          <form onSubmit={handleEmailSubmit(onEmailSubmit)} className={s.form}>
            <Input
              label="Email"
              variant="text"
              placeholder="Epam@epam.com"
              error={!!emailErrors.email}
              errorText={emailErrors.email?.message}
              {...registerEmail('email')}
            />
            <p className={`text-regular-sm ${s.text}`}>
              Enter your email address and we will send you further instructions{' '}
            </p>
            {sendEmailAgain && (
              <p className={`text-regular-sm ${s.textSendAgain}`}>
                The link has been sent by email. If you don’t receive an email send link again
              </p>
            )}
            <Button type={'submit'} disabled={isEmailSubmitting} className={s.btn}>
              {isEmailSubmitting ? 'Sending...' : sendEmailAgain ? 'Send Link Again' : 'Send Link'}
            </Button>
            <Button type="button" variant="textButton" onClick={handleSignIn} className={s.link}>
              Back to Sign In
            </Button>
            {error && <p className={`text-regular-sm ${s.error}`}>{error}</p>}
            {!sendEmailAgain && (
              <Controller
                control={emailControl}
                name="recaptchaToken"
                render={({ field, fieldState }) => (
                  <ReCaptchaWidget
                    siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
            )}
          </form>
        </div>
      }

      {
        <Modal open={modal} onOpenChange={() => setModal(false)} title="Email sent">
          <p>We have sent a link to confirm your email to email</p>
          <Button className={s.button} onClick={() => setModal(false)}>
            Ok
          </Button>
        </Modal>
      }
    </>
  )
}
