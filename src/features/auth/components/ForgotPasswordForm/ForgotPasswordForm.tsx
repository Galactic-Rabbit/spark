'use client'
import {Input} from '@/components/ui/Input';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@/components/ui/Button';
import Link from 'next/link';
import s from './ForgotPassward.module.css';
import {
  createPasswordSchema,
  forgotPasswordSchema,
  type CreatePasswordValues,
  type ForgotPasswordValues,
} from '@/features/auth/schemas/forgotPassword.schema';


const   ENTER_MAIL =  true; // показывает форму  в зависимости от приходящих данных либо страницу для ввода email либо форму для создания нового пароля
const   SEND_EMAIL_AGAIN = true; // для отображения текста и названия кнопки, если нужно отправить email повторно

export const ForgotPasswordForm = () => {


  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: {errors: emailErrors},
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {email: ''},
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: {errors: passwordErrors},
  } = useForm<CreatePasswordValues>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {password: '', confirmPassword: ''},
  });

  const onEmailSubmit: SubmitHandler<ForgotPasswordValues> = data => {
    console.log(data);
  };

  const onPasswordSubmit: SubmitHandler<CreatePasswordValues> = data => {
    console.log(data);
  };

  return (
    <>
      {ENTER_MAIL && (
        <form onSubmit={handleEmailSubmit(onEmailSubmit)} className={s.form}>
          <h1 className={`text-h1 ${s.h1}`}>Forgot Password</h1>
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
          {SEND_EMAIL_AGAIN && (
            <p className={`text-regular-sm ${s.textSendAgain}`}>
              The link has been sent by email. If you don’t receive an email send link again
            </p>
          )}
          <Button type={'submit'} className={s.btn}>
            {SEND_EMAIL_AGAIN ? 'Send Link Again' : 'Send Link'}
          </Button>
          <Link href={'/login'} className={s.link}>
            Back to Sign in
          </Link>
        </form>
      )}

      {!ENTER_MAIL && (
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className={s.form}>
          <h1 className={`text-h1 ${s.h1}`}>Create New Password</h1>
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
          <Button type={'submit'} className={s.btn}>
            {'Create new password'}
          </Button>
        </form>
      )}
    </>
  );
};
