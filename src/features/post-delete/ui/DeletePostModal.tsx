//тут описываем ВСЮ логику мутации

import { useDeletePostMutation } from '../api/useDeletePost.mutation'
import { Button } from '@shared/ui/Button'
import s from './DeletePostModal.module.css'
import { Modal } from '@shared/ui/Modal'

type Props = {
  postId: number
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const DeletePostModal = ({ postId, open, onClose, onSuccess }: Props) => {
  const { mutate, isPending } = useDeletePostMutation()

  const handleDelete = () => {
    mutate(postId, {
      onSuccess: () => {
        onClose?.()
        onSuccess?.()
      },
    })
  }

  return (
    <Modal
      open={open}
      onOpenChange={(o) => !o && onClose?.()}
      className={s.modal}
      title={'Delete post'}
    >
      <p>Are you sure you want to delete this post?</p>
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
