import { z } from 'zod'

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30'),

    email: z.email({
      error: 'The email must match the format example@example.com',
    }),

    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .regex(
        /^[A-Za-z0-9!#$%&'()*+\-./:;<=>?@[\\\]^_`{|}~]+$/,
        "Password must contain a-z, A-Z, ! # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~",
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
