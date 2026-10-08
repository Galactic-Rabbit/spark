import { z } from 'zod'

// Регулярки повторяют ограничения бэка из swagger-json (components.schemas.RegisterInputDto).
// В сгенерированном types.ts их нет — при изменении бэка сверять вручную.
const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/
const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/
const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/

export const registerSchema = z
  .object({
    userName: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30')
      .regex(USERNAME_REGEX, 'Username can contain only 0-9, a-z, A-Z, _ and -'),

    email: z.string().regex(EMAIL_REGEX, 'The email must match the format example@example.com'),

    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        PASSWORD_REGEX,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~',
      ),

    passwordConfirmation: z.string(),

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
