'use client'

import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Input} from '@shared/ui/Input';
import {Button} from '@shared/ui/Button';
import {useRouter, useSearchParams} from 'next/navigation';
import {PasswordRecoveryData, recoverySchema} from '@features/auth-recovery-password/model/recovery.schema';
import {useState} from 'react';
import s from '../../auth-forgot-password/ui/ForgotPassword.module.css'
import {usePasswordRecoveryMutation} from '@features/auth-recovery-password/api/usePasswordRecovery.mutation';

export const PasswordRecoveryForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { mutateAsync: recoveryPassword }= usePasswordRecoveryMutation()

  const searchParams = useSearchParams();
  const code = searchParams.get('code');


  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: {errors: passwordErrors, isSubmitting: isPasswordSubmitting},
  } = useForm<PasswordRecoveryData>({
    resolver: zodResolver(recoverySchema),
    mode: 'onBlur',
    defaultValues: {password: '', passwordConfirmation: ''},
  })


  const onPasswordSubmit: SubmitHandler<PasswordRecoveryData> = async (data) => {
    setError(null)
    try {
      await  recoveryPassword({
        newPassword: data.password,
        recoveryCode:code ?? ''
      })
      router.push('/login')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    }
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
            {...registerPassword('password')}
          />
          <Input
            label="Password confirmation"
            variant="password"
            error={!!passwordErrors.passwordConfirmation}
            errorText={passwordErrors.passwordConfirmation?.message}
            {...registerPassword('passwordConfirmation')}
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
  );
};

export default PasswordRecoveryForm;