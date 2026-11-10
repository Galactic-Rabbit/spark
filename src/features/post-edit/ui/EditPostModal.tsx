import s from './EditPostModal.module.css'
import { Modal } from '@shared/ui/Modal'
import { useState } from 'react'
import { ImageSlider } from '@shared/ui/ImageSlider'
import { UserBadge } from '@entities/user'
import { Input } from '@shared/ui/Input'
import { Post } from '@entities/post'
import { useEditPostMutation } from '@features/post-edit'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormData } from '@features/auth-login'
import { isApiError } from '@shared/api/apiError'
import Link from 'next/link'
import { Button } from '@shared/ui/Button'
import { PostEditFormData, postEditSchema } from '@features/post-edit/model/postEdit.schema'
import { Textarea } from '@shared/ui/Textarea'

type Props = {
  open: boolean
  post: Post
  onOpenChange: () => void
}

export const EditPostModal = ({ open, post, onOpenChange }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const { mutateAsync: editMutation } = useEditPostMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostEditFormData>({
    resolver: zodResolver(postEditSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: PostEditFormData) => {
    setError(null)
    try {
      await editMutation({ postId: post.id, description: data.description })
    } catch (error) {
      setError(isApiError(error) ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <Modal open={open} title="Editing post" onOpenChange={onOpenChange}>
      <div className={s.wrapPost}>
        <ImageSlider images={post.images.map((image) => image.url)} />
        <div>
          <UserBadge avatar={post.avatarOwner} userName={post.userName} className={s.userBadge} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              label="Add publication descriptions"
              error={!!errors.description}
              errorText={errors.description?.message}
              {...register('description')}
            />
            {error && (
              <p className={`text-regular-sm ${s.error}`} role="alert">
                {error}
              </p>
            )}

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  )
}
