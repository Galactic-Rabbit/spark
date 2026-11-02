import { Post, PostDetails } from '@entities/post'
import { DeletePostButton } from '@features/post-delete'
import { EditPostButton } from '@features/post-edit'
import { ModalBase } from '@shared/ui/ModalBase'

type Props = {
  onClose: () => void
  openedPost: Post | undefined
}

export const PostModal = ({ onClose, openedPost }: Props) => {
  return (
    <ModalBase
      open={openedPost !== undefined}
      onOpenChange={(open) => !open && onClose()}
      srTitle="Post"
      withOutsideClose
    >
      {openedPost && (
        <PostDetails
          post={openedPost}
          actions={
            // тут мы должны передавать дропдаун меню с кнопками
            <div>
              <DeletePostButton />
              <EditPostButton />
            </div>
          }
        />
      )}
    </ModalBase>
  )
}
