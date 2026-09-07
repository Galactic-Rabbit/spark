'use client'

import { useLoginMutation } from '@/features/auth/api/useLogin.mutation'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import s from './LoginForm.module.css'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { VkIcon } from '@/components/icons/VkIcon/VkIcon'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LoginFormData, loginSchema } from '../../schemas'

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const {mutateAsync: loginMutation} = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    try {
      console.log('Данные формы:', data)

      const result = await loginMutation({
        email: data.email,
        password: data.password,
      })
      router.push('/')
    } catch (error) {
      console.error('Ошибка входа:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignUp = () => {
    router.push('/register')
  }

  return (
    <div className={s.container}>
      <h1 className="text-h1">Sign In</h1>
      <Button className={s.vkButton}>
        <VkIcon />
        <span>Войти с VK ID</span>
      </Button>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
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
        <Link href="/forgot-password" className={`${s.forgotPasswordLink} text-regular-sm`}>
          Forgot Password
        </Link>
        <Button variant="primary" type="submit" disabled={!isValid || isSubmitting}>
          Sign In
        </Button>
      </form>
      <p className="text-regular">Don’t have an account?</p>
      <Button variant="textButton" onClick={handleSignUp} className={s.signUpLink}>
        Sign Up
      </Button>
    </div>
  )
}
