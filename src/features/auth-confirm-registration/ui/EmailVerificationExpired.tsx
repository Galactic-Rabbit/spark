'use client'

import { Button } from '@shared/ui/Button'
import { Input } from '@shared/ui/Input'
import s from './EmailVerification.module.css'
import { EmailVerificationExpiredImage } from '@shared/ui/icons'
import { useRegistrationEmailResending } from '../api/useRegistrationEmailResending.mutation'
import { useForm } from 'react-hook-form'
import { EmailResendingData, emailSchema } from '../model/email.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { isApiError } from '@shared/api/apiError'
import { Modal } from '@shared/ui/Modal'
import { useState } from 'react'

type Props = {
  email?: string | null
}

export const EmailVerificationExpired = ({ email: emailDefault }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const { mutateAsync: resendEmail, isPending, isPaused } = useRegistrationEmailResending()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm<EmailResendingData>({
    resolver: zodResolver(emailSchema),
    mode: 'onBlur',
    defaultValues: {
      email: emailDefault ?? '',
    },
  })

  const onSubmit = async (data: EmailResendingData) => {
    try {
      await resendEmail(data)
      setEmail(data.email)
      setIsModalOpen(true)
      reset()
    } catch (error) {
      if (!isApiError(error)) {
        setError('root.serverError', { message: 'Something went wrong. Try again later' })
        return
      }
      if (error.body) {
        error.body.messages.forEach(({ message, field }) => {
          if (field === 'email') {
            setError(field, { message })
          } else {
            setError('root.serverError', { message })
          }
        })
        return
      }
      setError('root.serverError', { message: error.message })
    }
  }

  if (isModalOpen) {
    return (
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Email sent"
        className={s.emailSentModal}
      >
        <p>We have sent a link to confirm your email to {email}</p>
      </Modal>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1 className={s.title}>Email verification link expired</h1>

        <p className={s.description}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputWrapper}>
            <Input
              label="Email"
              variant="text"
              placeholder={'Epam@epam.com'}
              {...register('email')}
              error={!!errors.email}
              errorText={errors.email?.message}
              onBlur={() => trigger('email')}
            />
          </div>
          <Button className={s.button} type="submit" disabled={!isValid || isPending}>
            Resend verification link
          </Button>
          {errors.root?.serverError && (
            <span className={s.errorText}>{errors.root.serverError.message}</span>
          )}
          {isPaused && (
            <span className={s.errorText}>
              {"No internet connection. We'll send the form once you're back online"}
            </span>
          )}
        </form>

        <div className={s.imageWrapper}>
          <EmailVerificationExpiredImage />
        </div>
      </div>
    </div>
  )
}
