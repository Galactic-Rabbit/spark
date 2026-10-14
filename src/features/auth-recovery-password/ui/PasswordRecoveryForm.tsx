'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { isApiError } from '@shared/api/apiError'
import { Button } from '@shared/ui/Button'
import { Input } from '@shared/ui/Input'
import { useCheckRecoveryCodeQuery } from '../api/useCheckRecoveryCode.query'
import { usePasswordRecoveryMutation } from '../api/usePasswordRecovery.mutation'
import { PasswordRecoveryData, recoverySchema } from '../model/recovery.schema'
import s from '../../auth-forgot-password/ui/ForgotPassword.module.css'

export const PasswordRecoveryForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { mutateAsync: recoveryPassword } = usePasswordRecoveryMutation()

  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const { error: codeCheckError, isPending: isCodeCheckPending } = useCheckRecoveryCodeQuery(code)

  // Блокируем форму только на однозначный отказ (400) или отсутствующий code.
  // Сеть, 429 и 500 не должны запирать пользователя на странице — пусть попробует отправить.
  const isCodeRejected =
    !code || (isApiError(codeCheckError) && codeCheckError.status === 400)

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<PasswordRecoveryData>({
    resolver: zodResolver(recoverySchema),
    mode: 'onBlur',
    defaultValues: { password: '', passwordConfirmation: '' },
  })

  const onPasswordSubmit: SubmitHandler<PasswordRecoveryData> = async (data) => {
    setError(null)

    if (!code) {
      setError('Recovery link is invalid or expired. Please request a new one.')
      return
    }

    try {
      await recoveryPassword({ newPassword: data.password, recoveryCode: code })
      // replace, а не push: код одноразовый, и «назад» не должен возвращать на эту форму
      router.replace('/login')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    }
  }

  if (code && isCodeCheckPending) {
    return (
      <div className={s.container}>
        <h1 className={`text-h1`}>Create New Password</h1>
      </div>
    )
  }

  if (isCodeRejected) {
    return (
      <div className={s.container}>
        <h1 className={`text-h1`}>Create New Password</h1>
        <p className={`text-regular-sm ${s.text}`}>
          This recovery link is invalid or has expired. Please request a new one.
        </p>
        <Button
          type="button"
          className={s.btnNewPassword}
          onClick={() => router.replace('/forgot-password')}
        >
          Request new link
        </Button>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <h1 className={`text-h1`}>Create New Password</h1>
      <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className={s.form}>
        <div className={s.inputForm}>
          <Input
            label="New password"
            variant="password"
            error={!!passwordErrors.password}
            errorText={passwordErrors.password?.message}
            {...registerPassword('password', { onChange: () => setError(null) })}
          />
          <Input
            label="Password confirmation"
            variant="password"
            error={!!passwordErrors.passwordConfirmation}
            errorText={passwordErrors.passwordConfirmation?.message}
            {...registerPassword('passwordConfirmation', { onChange: () => setError(null) })}
          />
        </div>
        <p className={`text-regular-sm ${s.text}`}>
          Your password must be between 6 and 20 characters
        </p>
        {error && (
          <p className={`text-regular-sm ${s.error}`} role="alert">
            {error}
          </p>
        )}
        <Button type={'submit'} disabled={isPasswordSubmitting} className={s.btnNewPassword}>
          {isPasswordSubmitting ? 'Creating...' : 'Create new password'}
        </Button>
      </form>
    </div>
  )
}
