import { z } from 'zod'
import { passwordConfirmationSchema, passwordSchema } from '@shared/model/password.schema'

// Регулярки повторяют ограничения бэка из swagger-json (components.schemas.RegisterInputDto).
// В сгенерированном types.ts их нет — при изменении бэка сверять вручную.
const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/
const USERNAME_MIN_LENGTH = 6
const USERNAME_MAX_LENGTH = 20
const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/

export const registerSchema = z
  .object({
    userName: z
      .string()
      .min(USERNAME_MIN_LENGTH, `Minimum number of characters ${USERNAME_MIN_LENGTH}`)
      .max(USERNAME_MAX_LENGTH, `Maximum number of characters ${USERNAME_MAX_LENGTH}`)
      .regex(USERNAME_REGEX, 'Username can contain only 0-9, a-z, A-Z, _ and -'),

    email: z.string().regex(EMAIL_REGEX, 'The email must match the format example@example.com'),

    password: passwordSchema,

    passwordConfirmation: passwordConfirmationSchema,

    terms: z.boolean(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'The passwords must match',
    path: ['passwordConfirmation'],
  })
  .refine((data) => data.terms, {
    message: 'You must agree to the Terms of Service and Privacy Policy',
    path: ['terms'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>
