'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import s from './ForgotPassword.module.css'
import {
  createPasswordSchema,
  CreatePasswordValues,
  forgotPasswordSchema,
  ForgotPasswordValues,
} from '../../schemas'
import { useRouter } from 'next/navigation'
import { ReCaptchaWidget } from '@/components/ui/ReCaptchaWidget'

export const ForgotPasswordForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [enterMail, setEnterMail] = useState(true)
  const [sendEmailAgain, setSendEmailAgain] = useState(false)

  const router = useRouter()

  const emailMethods = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: { email: '', recaptchaToken: '' },
  })

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = emailMethods

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<CreatePasswordValues>({
    resolver: zodResolver(createPasswordSchema),
    mode: 'onBlur',
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onEmailSubmit: SubmitHandler<ForgotPasswordValues> = async ({ email }) => {
    setError(null)
    try {
      // recaptchaToken валидируется через схему, но на сервер уходит только email
      console.log({ email })
      setSendEmailAgain(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    }
  }

  const onPasswordSubmit: SubmitHandler<CreatePasswordValues> = async (data) => {
    setError(null)
    try {
      console.log(data)
      setEnterMail(true)
      setSendEmailAgain(false)
      router.push('/login')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    }
  }

  const handleSignIn = () => {
    router.push('/login')
  }

  return (
    <>
      {enterMail && (
        <FormProvider {...emailMethods}>
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
              {error && <p className={`text-regular-sm ${s.error}`}>{error}</p>}
              <Button type={'submit'} disabled={isEmailSubmitting} className={s.btn}>
                {isEmailSubmitting ? 'Sending...' : sendEmailAgain ? 'Send Link Again' : 'Send Link'}
              </Button>
              <Button type="button" variant="textButton" onClick={handleSignIn} className={s.link}>
                Back to Sign In
              </Button>
              <ReCaptchaWidget
                siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lfcy54tAAAAAOGBRLoz3lDRT--v51yrfPr4vfnt'}
              />

            </form>
          </div>
        </FormProvider>
      )}

      {!enterMail && (
        <div className={s.container}>
          <h1 className={`text-h1`}>Create New Password</h1>
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className={s.form}>
            <div className={s.inputForm}>
              <Input
                label="New password"
                variant="password"
                error={!!passwordErrors.password}
                errorText={passwordErrors.password?.message}
                {...registerPassword('password')}
              />
              <Input
                label="Password confirmation"
                variant="password"
                error={!!passwordErrors.confirmPassword}
                errorText={passwordErrors.confirmPassword?.message}
                {...registerPassword('confirmPassword')}
              />
            </div>
            <p className={`text-regular-sm ${s.text}`}>
              Your password must be between 6 and 20 characters
            </p>
            {error && <p className={`text-regular-sm ${s.error}`}>{error}</p>}
            <Button type={'submit'} disabled={isPasswordSubmitting} className={s.btnNewPassword}>
              {isPasswordSubmitting ? 'Creating...' : 'Create new password'}
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
