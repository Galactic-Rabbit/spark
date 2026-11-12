'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitEvent } from 'react'

import { createPostSchema, type CreatePostFormValues } from '../model/createPost.schema'
import { useCreatePostWithPhotos } from '../model/useCreatePostWithPhotos'
import { PostImagesPreview } from './PostImagesPreview'
import { Button } from '@/shared/ui/Button'

type PreviewImage = {
  id: string
  url: string
}

export const CreatePostForm = () => {
  const [previews, setPreviews] = useState<PreviewImage[]>([])
  const previewsRef = useRef<PreviewImage[]>([])

  const { createPostWithPhotos, isPending, error } = useCreatePostWithPhotos()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      description: '',
      files: [],
    },
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      previewsRef.current.forEach((preview) => {
        URL.revokeObjectURL(preview.url)
      })
    }
  }, [])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? [])

    if (selectedFiles.length === 0) return

    previewsRef.current.forEach((preview) => {
      URL.revokeObjectURL(preview.url)
    })

    const newPreviews = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
    }))

    previewsRef.current = newPreviews
    setPreviews(newPreviews)

    setValue('files', selectedFiles, {
      shouldValidate: true,
      shouldDirty: true,
    })

    event.target.value = ''
  }

  const handleRemoveImage = (index: number) => {
    const currentPreviews = previewsRef.current
    const removedPreview = currentPreviews[index]

    if (!removedPreview) return

    URL.revokeObjectURL(removedPreview.url)

    const updatedPreviews = currentPreviews.filter((_, i) => i !== index)

    previewsRef.current = updatedPreviews
    setPreviews(updatedPreviews)

    const updatedFiles = getValues('files').filter((_, i) => i !== index)

    setValue('files', updatedFiles, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const onSubmit = async (data: CreatePostFormValues) => {
    try {
      await createPostWithPhotos(data)

      previewsRef.current.forEach((preview) => {
        URL.revokeObjectURL(preview.url)
      })

      previewsRef.current = []
      setPreviews([])
      reset()
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void handleSubmit(onSubmit)(event)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Create post</h2>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />

      <Button type="button" variant="primary" onClick={() => fileInputRef.current?.click()}>
        Add photos
      </Button>

      {errors.files && <p>{errors.files.message}</p>}

      {previews.length > 0 && (
        <PostImagesPreview previews={previews} onRemove={handleRemoveImage} />
      )}

      <textarea placeholder="Write a description..." {...register('description')} />

      {errors.description && <p>{errors.description.message}</p>}

      {error && <p>{error.message}</p>}

      <Button type="submit" variant="primary" disabled={isPending}>
        {isPending ? 'Publishing...' : 'Publish'}
      </Button>
    </form>
  )
}
