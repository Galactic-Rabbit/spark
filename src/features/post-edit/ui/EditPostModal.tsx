import s from './EditPostModal.module.css'
import { Modal } from '@shared/ui/Modal'
import { useState } from 'react'
import { ImageSlider } from '@shared/ui/ImageSlider'
import { UserBadge } from '@entities/user'
import { Post, POST_DESCRIPTION_MAX_LENGTH } from '@entities/post'
import { useEditPostMutation } from '../api/useEditPost.mutation'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isApiError } from '@shared/api/apiError'
import { Button } from '@shared/ui/Button'
import { PostEditFormData, postEditSchema } from '../model/postEdit.schema'
import { Textarea } from '@shared/ui/Textarea'

type Props = {
  open: boolean
  post: Post
  onOpenChange: () => void
}

export const EditPostModal = ({ open, post, onOpenChange }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const { mutateAsync: editMutation } = useEditPostMutation()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PostEditFormData>({
    resolver: zodResolver(postEditSchema),
    mode: 'onBlur',
    defaultValues: { description: post.description },
  })

  const description = useWatch({ control, name: 'description' }) ?? ''

  const onSubmit = async (data: PostEditFormData) => {
    setError(null)
    try {
      await editMutation({ postId: post.id, description: data.description })
      reset({
        description: data.description,
      })
      onOpenChange()
    } catch (error) {
      setError(isApiError(error) ? error.message : 'Something went wrong. Please try again.')
    }
  }

  const handleRequestClose = () => {
    if (isDirty) {
      setIsConfirmOpen(true) // не закрываем, а спрашиваем
      return
    }
    onOpenChange()
  }

  const handleConfirmClose = () => {
    setIsConfirmOpen(false)
    reset()
    onOpenChange()
  }

  return (
    <>
      <Modal
        open={open}
        title="Edit Post"
        onOpenChange={handleRequestClose}
        className={s.modal}
        bodyClassName={s.body}
      >
        <div className={s.wrapPost}>
          <ImageSlider images={post.images.map((image) => image.url)} className={s.slider} />
          <div className={s.content}>
            <UserBadge avatar={post.avatarOwner} userName={post.userName} />
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
              <Textarea
                label="Add publication descriptions"
                maxLength={POST_DESCRIPTION_MAX_LENGTH}
                valueLength={description.length}
                error={!!errors.description}
                errorText={errors.description?.message}
                {...register('description')}
              />
              {error && (
                <p className={`text-regular-sm ${s.error}`} role="alert">
                  {error}
                </p>
              )}

              <Button variant="primary" type="submit" disabled={isSubmitting} className={s.submit}>
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      </Modal>
      <Modal
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Close Post"
        className={s.confirm}
        bodyClassName={s.confirmBody}
      >
        <p className="text-regular">
          Do you really want to close the edition of the publication? If you close changes won’t be
          saved
        </p>
        <div className={s.actions}>
          <Button variant="outline" onClick={handleConfirmClose}>
            Yes
          </Button>
          <Button variant="primary" onClick={() => setIsConfirmOpen(false)}>
            No
          </Button>
        </div>
      </Modal>
    </>
  )
}
