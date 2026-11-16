import { z } from 'zod'
import { passwordConfirmationSchema, passwordSchema } from '@shared/model/password.schema'

export const recoverySchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  })

export type PasswordRecoveryData = z.infer<typeof recoverySchema>
