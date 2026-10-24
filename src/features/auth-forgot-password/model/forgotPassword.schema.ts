import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  recaptchaToken: z.string().min(1, 'Please verify that you are not a robot'),
})

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

