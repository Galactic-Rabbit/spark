import { Post, PostDetails } from '@entities/post'
import { DeletePostButton } from '@features/post-delete'
import { EditPostModal } from '@features/post-edit'
import { ModalBase } from '@shared/ui/ModalBase'
import { CommentList } from '@widgets/comment-list'
import s from './PostModal.module.css'
import { useState } from 'react'
import { DropdownMenuCustom, DropdownMenuItem } from '@shared/ui/DropdownMenuCustom'
import { MoreHorizontal } from '@shared/ui/icons'

type Props = {
  onClose: () => void
  openedPost: Post | undefined
}

export const PostModal = ({ onClose, openedPost }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <ModalBase
        open={openedPost !== undefined}
        onOpenChange={(open) => !open && onClose()}
        srTitle="Post"
        withOutsideClose
        className={s.modal}
      >
        {openedPost && (
          <PostDetails
            post={openedPost}
            actions={
              <DropdownMenuCustom
                ariaLabel="Open menu"
                trigger={<MoreHorizontal width={24} height={24} className={s.iconMenu} />}
              >
                <DropdownMenuItem asChild>
                  <DeletePostButton />
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsEditing(true)}>Edit Post</DropdownMenuItem>
              </DropdownMenuCustom>
            }
            comments={<CommentList />}
          />
        )}
      </ModalBase>
      {openedPost && (
        <EditPostModal
          open={isEditing}
          post={openedPost}
          onOpenChange={() => setIsEditing(false)}
        />
      )}
    </>
  )
}
