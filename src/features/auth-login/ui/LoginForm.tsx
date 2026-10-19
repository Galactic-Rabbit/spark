'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shared/ui/Button'
import { Input } from '@shared/ui/Input'
import { useLoginMutation } from '../api/useLogin.mutation'
import { LoginFormData, loginSchema } from '../model/login.schema'
import s from './LoginForm.module.css'

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { mutateAsync: loginMutation } = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    try {
      await loginMutation({ email: data.email, password: data.password })
      router.push('/')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className={s.container}>
      <h1 className="text-h1">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input
          variant="text"
          label="Email"
          placeholder="example@example.com"
          error={!!errors.email}
          errorText={errors.email?.message}
          {...register('email', { onChange: () => setError(null) })}
        />
        <Input
          variant="password"
          label="Password"
          placeholder="••••••••"
          error={!!errors.password}
          errorText={errors.password?.message}
          {...register('password', { onChange: () => setError(null) })}
        />
        {error && (
          <p className={`text-regular-sm ${s.error}`} role="alert">
            {error}
          </p>
        )}
        <Link href="/forgot-password" className={`${s.forgotPasswordLink} text-regular-sm`}>
          Forgot Password
        </Link>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Sign In
        </Button>
      </form>
      <p className="text-regular">Don’t have an account?</p>
        <Button as={Link} href="/register" variant="textButton" className={s.signUpLink}>
            Sign Up
        </Button>
    </div>
  )
}
