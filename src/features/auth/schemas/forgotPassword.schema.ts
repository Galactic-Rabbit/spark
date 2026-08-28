import {z} from 'zod'

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
})

export const createPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be at most 20 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
export type CreatePasswordValues = z.infer<typeof createPasswordSchema>
