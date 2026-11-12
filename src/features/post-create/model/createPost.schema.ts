import { z } from 'zod'

export const createPostSchema = z.object({
  description: z.string().max(500, 'Description must be 500 characters or less'),

  files: z
    .array(z.instanceof(File))
    .min(1, 'Please select at least one photo')
    .max(10, 'You can upload up to 10 photos'),
})

export type CreatePostFormValues = z.infer<typeof createPostSchema>
