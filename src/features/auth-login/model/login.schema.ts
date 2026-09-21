import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email обязателен для заполнения')
    .email('The email must match the format example@example.com'),
  password: z
    .string()
    .min(1, 'Пароль обязателен для заполнения')
    .min(6, 'Пароль должен содержать минимум 6 символов'),
})

export type LoginFormData = z.infer<typeof loginSchema>
