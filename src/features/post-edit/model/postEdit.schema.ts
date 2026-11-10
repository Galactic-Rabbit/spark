import { z } from 'zod'
import {
  POST_DESCRIPTION_MAX_LENGTH,
  POST_DESCRIPTION_MIN_LENGTH,
} from '@entities/post/model/constants'

export const postEditSchema = z.object({
  description: z
    .string()
    .min(POST_DESCRIPTION_MIN_LENGTH, 'Enter a comment')
    .max(
      POST_DESCRIPTION_MAX_LENGTH,
      `The maximum length of a comment is ${POST_DESCRIPTION_MAX_LENGTH} characters`,
    ),
})

export type PostEditFormData = z.infer<typeof postEditSchema>
