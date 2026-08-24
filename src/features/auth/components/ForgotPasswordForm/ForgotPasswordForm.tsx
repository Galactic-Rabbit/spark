'use client'
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import {SubmitHandler, useForm} from 'react-hook-form';

type ForgotFormValues = {
  email: string,
}

export const ForgotPasswordForm = () => {

const {register,handleSubmit,reset, formState:{errors}}=useForm<ForgotFormValues>({defaultValues:{email:''}})

  const onSubmit: SubmitHandler<ForgotFormValues> = data => {
    console.log(data)
  }
  return (
    <>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" variant="text" placeholder="Epam@epam.com" error={!!errors.email}
               errorText="User with this email doesn't exist"
               {...register('email')}/>
        <p>Enter your email address and we will send you further instructions </p>
        {/*<Button type={'submit'}>{error ? 'Send Link Again' : 'Send Link'}</Button>*/}
      </form>
    </>
  );
};
