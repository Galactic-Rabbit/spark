'use client'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button} from '@shared/ui/Button'
import {Input} from '@shared/ui/Input'
import {Modal} from '@shared/ui/Modal'
import {ReCaptchaWidget, type ReCaptchaWidgetHandle} from '@shared/ui/ReCaptchaWidget'
import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'
import {Controller, SubmitHandler, useForm, useWatch} from 'react-hook-form'
import {useForgotPasswordMutation} from '../api/useForgotPassword.mutation'
import {usePasswordRecoveryResendingMutation} from '../api/usePasswordRecoveryResending.mutation'
import {forgotPasswordSchema, ForgotPasswordValues} from '../model/forgotPassword.schema'
import s from './ForgotPassword.module.css'

export const ForgotPasswordForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sentTo, setSentTo] = useState('')
  const [sendEmailAgain, setSendEmailAgain] = useState(false)
  const captchaRef = useRef<ReCaptchaWidgetHandle>(null)
  const { mutateAsync: forgotPassword } = useForgotPasswordMutation()
  const { mutateAsync: recoveryResending } = usePasswordRecoveryResendingMutation()

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    control: emailControl,
    setValue,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: { email: '', recaptchaToken: '' },
  })

  const emailValue = useWatch({ control: emailControl, name: 'email' })
  const recaptchaToken = useWatch({ control: emailControl, name: 'recaptchaToken' })
  const isResend = sendEmailAgain && emailValue === sentTo && !!recaptchaToken

  useEffect(() => {
    if (sendEmailAgain && emailValue !== sentTo) {
      setValue('recaptchaToken', '')
      captchaRef.current?.reset()
    }
  }, [emailValue, sendEmailAgain, sentTo, setValue])

  const onEmailSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    setError(null)
    try {
      const baseUrl = `${window.location.origin}/password-recovery`

      if (isResend) {
        await recoveryResending({ email: data.email, baseUrl })
      } else {
        await forgotPassword({
          email: data.email,
          recaptcha: data.recaptchaToken,
          baseUrl,
        })
        setSendEmailAgain(true)
      }

      setSentTo(data.email)
      setIsModalOpen(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')

      // При падении повторной отправки капча не участвовала в запросе —
      // чистим только когда токен реально уходил на бэк, иначе режим resend
      // схлопнется, а виджет уже размонтирован.
      if (!isResend) {
        setValue('recaptchaToken', '')
        captchaRef.current?.reset()
      }
    }
  }

  return (
    <>
      <div className={s.container}>
        <h1 className={`text-h1`}>Forgot Password</h1>
        <form onSubmit={(e) => handleEmailSubmit(onEmailSubmit)(e)} className={s.form}>
          <Input
            label="Email"
            variant="text"
            placeholder="Epam@epam.com"
            error={!!emailErrors.email}
            errorText={emailErrors.email?.message}
            {...registerEmail('email', { onChange: () => setError(null) })}
          />
          <p className={`text-regular-sm ${s.text}`}>
            Enter your email address and we will send you further instructions{' '}
          </p>
          {isResend && (
            <p className={`text-regular-sm ${s.textSendAgain}`}>
              The link has been sent by email. If you don’t receive an email send link again
            </p>
          )}
          <Button type={'submit'} disabled={isEmailSubmitting} className={s.btn}>
            {isEmailSubmitting ? 'Sending...' : isResend ? 'Send Link Again' : 'Send Link'}
          </Button>
            <Button as={Link} href="/login" variant="textButton" className={s.link}>
                Back to Sign In
            </Button>
          {error && (
            <p className={`text-regular-sm ${s.error}`} role="alert">
              {error}
            </p>
          )}
          {!isResend && (
            <Controller
              control={emailControl}
              name="recaptchaToken"
              render={({ field, fieldState }) => (
                <ReCaptchaWidget
                  ref={captchaRef}
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

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} title="Email sent">
        <p>
          We have sent a password recovery link to {sentTo}. Follow it to create a new password.
        </p>
        <Button className={s.button} onClick={() => setIsModalOpen(false)}>
          Ok
        </Button>
      </Modal>
    </>
  )
}
