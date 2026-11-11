//тут описываем ВСЮ логику мутации

import { useDeletePostMutation } from '../api/useDeletePost.mutation'
import { Button } from '@shared/ui/Button'
import s from './DeletePostModal.module.css'
import { Modal } from '@shared/ui/Modal'
import { useState } from 'react'
import { isApiError } from '@shared/api/apiError'

type Props = {
  postId: number
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const DeletePostModal = ({ postId, open, onClose, onSuccess }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const { mutateAsync, isPending } = useDeletePostMutation()

  const handleDelete = async () => {
    setError(null)
    try {
      await mutateAsync(postId)
      onClose()
      onSuccess?.()
    } catch (error) {
      setError(isApiError(error) ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={(o) => !o && onClose?.()}
      className={s.modal}
      title={'Delete post'}
    >
      <p>Are you sure you want to delete this post?</p>
      {error && (
        <p className={`text-regular-sm ${s.error}`} role="alert">
          {error}
        </p>
      )}
      <div className={s.conteinerBtn}>
        <Button variant="outline" onClick={handleDelete} disabled={isPending} className={s.button}>
          Yes
        </Button>
        <Button variant="primary" onClick={onClose} className={s.button}>
          No
        </Button>
      </div>
    </Modal>
  )
}
