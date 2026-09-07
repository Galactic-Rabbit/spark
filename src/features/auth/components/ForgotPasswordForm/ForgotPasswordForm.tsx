'use client'
import {useForgotPasswordMutation} from "@/features/auth/api/useForgotPassword.mutation";
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
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

type Props = {
  siteKey: string
  isVerifying?: boolean
}

export const ForgotPasswordForm = ({ siteKey, isVerifying = false }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [enterMail, setEnterMail] = useState(true)
  const [sendEmailAgain, setSendEmailAgain] = useState(false)
  const {mutateAsync: forgotPassword} = useForgotPasswordMutation()

  const router = useRouter()

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    control: emailControl,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: { email: '', recaptchaToken: '' },
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<CreatePasswordValues>({
    resolver: zodResolver(createPasswordSchema),
    mode: 'onBlur',
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onEmailSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    setError(null)
    try {
      await forgotPassword({
        email: data.email,
        recaptchaToken: data.recaptchaToken,
      })
      setSendEmailAgain(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    }
  }

  const onPasswordSubmit: SubmitHandler<CreatePasswordValues> = async () => {
    setError(null)
    try {
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
            {!sendEmailAgain && !isVerifying && (
              <Controller
                control={emailControl}
                name="recaptchaToken"
                render={({ field, fieldState }) => (
                  <ReCaptchaWidget
                    siteKey={siteKey}
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
            )}
          </form>
        </div>
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
