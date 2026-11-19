'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitEvent } from 'react'

import { createPostSchema, type CreatePostFormValues } from '../model/createPost.schema'
import { useCreatePostWithPhotos } from '../model/useCreatePostWithPhotos'
import { Button } from '@/shared/ui/Button'
import { EditedImagePreview } from './EditedImagePreview'

type CreatePostFormProps = {
  files: File[]
  onSuccess: () => void
}

export const CreatePostForm = ({ files, onSuccess }: CreatePostFormProps) => {
  const { createPostWithPhotos, isPending, error } = useCreatePostWithPhotos()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      description: '',
      files,
    },
  })

  const description = watch('description') ?? ''

  const onSubmit = async (data: CreatePostFormValues) => {
    try {
      await createPostWithPhotos({
        ...data,
        files,
      })

      onSuccess()
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void handleSubmit(onSubmit)(event)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        <div>{files[0] && <EditedImagePreview file={files[0]} />}</div>

        <div>
          <textarea
            placeholder="Write a description..."
            maxLength={500}
            {...register('description')}
          />

          <p>{description.length} / 500</p>

          {errors.description && <p>{errors.description.message}</p>}
        </div>
      </div>

      {errors.files && <p>{errors.files.message}</p>}

      {error && <p>{error.message}</p>}

      <Button type="submit" variant="primary" disabled={isPending}>
        {isPending ? 'Publishing...' : 'Publish'}
      </Button>
    </form>
  )
}
