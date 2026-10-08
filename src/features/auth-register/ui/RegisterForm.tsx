'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shared/ui/Button'
import { Input } from '@shared/ui/Input'
import s from './RegisterForm.module.css'
import { useSignUp } from '../api/useSignUp'
import { RegisterFormData, registerSchema } from '../model/register.schema'
import { Modal } from '@/shared/ui/Modal'
import { isServerError } from '@/shared/api/isServerError'
import { AuthFormWrapper } from '@/shared/ui/AuthFormWrapper'

const REGISTER_FIELDS = ['userName', 'email', 'password'] as const
type RegisterField = (typeof REGISTER_FIELDS)[number]

const isRegisterField = (name: string): name is RegisterField =>
  (REGISTER_FIELDS as readonly string[]).includes(name)

export const RegisterForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()
  const { mutateAsync: signUp, isPending, isPaused } = useSignUp()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp({ userName: data.userName, email: data.email, password: data.password })
      setEmail(data.email)
      setIsModalOpen(true)
      reset()
    } catch (error) {
      if (!isServerError(error)) {
        setError('root.serverError', { message: 'Something went wrong. Try again later' })
        return
      }
      error.messages.forEach(({ message, field }) => {
        if (isRegisterField(field)) {
          setError(field, { message })
        } else {
          setError('root.serverError', { message })
        }
      })
    }
  }

  const handleSignIn = () => {
    router.push('/login')
  }

  if (isModalOpen) {
    return (
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} title="Email sent">
        <p>We have sent a link to confirm your email to {email}</p>
      </Modal>
    )
  }

  return (
    <AuthFormWrapper>
      <div className={s.container}>
        <h1 className="text-h1">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <Input
            variant="text"
            label="Username"
            placeholder="Username"
            {...register('userName')}
            error={!!errors.userName}
            errorText={errors.userName?.message}
            onBlur={() => trigger('userName')}
          />

          <Input
            variant="text"
            label="Email"
            placeholder="example@example.com"
            {...register('email')}
            error={!!errors.email}
            errorText={errors.email?.message}
            onBlur={() => trigger('email')}
          />

          <Input
            variant="password"
            label="Password"
            placeholder="••••••••"
            {...register('password')}
            error={!!errors.password}
            errorText={errors.password?.message}
            onBlur={() => trigger('password')}
          />

          <Input
            variant="password"
            label="Password confirmation"
            placeholder="Password confirmation"
            {...register('passwordConfirmation')}
            error={!!errors.passwordConfirmation}
            errorText={errors.passwordConfirmation?.message}
            onBlur={() => trigger('passwordConfirmation')}
          />

          <div className={s.agreement}>
            <input type="checkbox" {...register('terms')} />

            <span className="text-small">
              I agree to the{' '}
              <Link href="/terms-of-service" className={s.link}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className={s.link}>
                Privacy Policy
              </Link>
            </span>
          </div>

          {errors.terms && <span className={s.errorText}>{errors.terms.message}</span>}

          <Button variant="primary" type="submit" disabled={!isValid || isPending}>
            Sign Up
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

        <p className="text-regular">Do you have an account?</p>

        <Button variant="textButton" onClick={handleSignIn} className={s.signInLink}>
          Sign In
        </Button>
      </div>
    </AuthFormWrapper>
  )
}
