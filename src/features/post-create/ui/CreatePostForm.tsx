'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitEvent } from 'react'

import { createPostSchema, type CreatePostFormValues } from '../model/createPost.schema'
import { useCreatePostWithPhotos } from '../model/useCreatePostWithPhotos'
import { ImageSlider } from '@/shared/ui/ImageSlider'

import s from './CreatePostForm.module.css'

type CreatePostFormProps = {
  files: File[]
  imageUrls: string[]
  description: string
  onDescriptionChange: (description: string) => void
  onSuccess: () => void
}

export const CreatePostForm = ({
  files,
  imageUrls,
  description,
  onDescriptionChange,
  onSuccess,
}: CreatePostFormProps) => {
  const { createPostWithPhotos, error } = useCreatePostWithPhotos()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      description,
      files,
    },
  })

  const descriptionField = register('description')

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
    <form id="create-post-form" className={s.layout} onSubmit={handleFormSubmit}>
      <div className={s.imageSection}>
        <ImageSlider images={imageUrls} />
      </div>

      <div className={s.detailsSection}>
        <div className={s.profile}>
          <div className={s.avatar} aria-hidden="true" />
          <span className={s.username}>Username</span>
        </div>

        <label htmlFor="post-description" className={s.fieldLabel}>
          Add publication descriptions
        </label>

        <textarea
          id="post-description"
          className={s.description}
          maxLength={500}
          placeholder="Write a description..."
          {...descriptionField}
          onChange={(event) => {
            void descriptionField.onChange(event)
            onDescriptionChange(event.target.value)
          }}
        />

        <p className={s.counter}>{description.length} / 500</p>

        {errors.description && <p className={s.error}>{errors.description.message}</p>}

        <div className={s.divider} />

        <label htmlFor="post-location" className={s.fieldLabel}>
          Add location
        </label>

        <input
          id="post-location"
          className={s.location}
          placeholder="Add location"
          disabled
          title="Location is not implemented yet"
        />

        {errors.files && <p className={s.error}>{errors.files.message}</p>}

        {error && <p className={s.error}>{error.message}</p>}
      </div>
    </form>
  )
}
