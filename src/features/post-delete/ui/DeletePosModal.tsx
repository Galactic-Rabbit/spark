//тут описываем ВСЮ логику мутации

import { useDeletePostMutation } from '../api/useDeletePost.mutation'
import { ModalBase } from '@shared/ui/ModalBase'
import { Button } from '@shared/ui/Button'

type Props = {
  postId: number
  open?: boolean
  onClose?: () => void
}

export const DeletePostModal = ({ postId, open, onClose }: Props) => {
  const { mutate, isPending } = useDeletePostMutation()

  const handleDelete = () => {
    mutate(postId, {
      onSuccess: () => onClose?.(),
    })
  }

  return (
    <ModalBase open={open} onOpenChange={(o) => !o && onClose?.()} srTitle="Delete Post">
      <h2>Delete Post</h2>
      <p>Are you sure you want to delete this post?</p>
      <div>
        <Button variant="outline" onClick={handleDelete} disabled={isPending}>
          Yes
        </Button>
        <Button variant="primary" onClick={onClose}>
          No
        </Button>
      </div>
    </ModalBase>
  )
}
