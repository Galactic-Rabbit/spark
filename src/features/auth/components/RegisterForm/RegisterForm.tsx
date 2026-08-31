'use client'

import { VkIcon } from '@/components/icons/VkIcon/VkIcon'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

import { RegisterFormData, registerSchema } from '../../schemas'

import s from './RegisterForm.module.css'
import { CheckBox } from '@/components/ui/CheckBox'

export const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true)

    try {
      console.log('Данные формы регистрации:', data)

      // Здесь будет API запрос

      router.push('/')
    } catch (error) {
      console.error('Ошибка регистрации:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignIn = () => {
    router.push('/login')
  }

  return (
    <div className={s.container}>
      <h1 className="text-h1">Sign Up</h1>

      <Button className={s.vkButton}>
        <VkIcon />
        <span>Войти с VK ID</span>
        {/* Здесь вставишь свою иконку */}
      </Button>

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input
          variant="text"
          label="Username"
          placeholder="Username"
          {...register('username')}
          error={!!errors.username}
          errorText={errors.username?.message}
          onBlur={() => trigger('username')}
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

        <Button variant="primary" type="submit" disabled={!isValid || isSubmitting}>
          Sign Up
        </Button>
      </form>

      <p className="text-regular">Do you have an account?</p>

      <Button variant="textButton" onClick={handleSignIn} className={s.signInLink}>
        Sign In
      </Button>
    </div>
  )
}
