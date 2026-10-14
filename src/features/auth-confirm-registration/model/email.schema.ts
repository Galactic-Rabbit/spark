import { z } from 'zod'

const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/

export const emailSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'The email must match the format example@example.com'),
})

export type EmailResendingData = z.infer<typeof emailSchema>
