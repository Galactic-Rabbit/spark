'use client'

import { Post, PostDetails } from '@entities/post'
import { useSession } from '@entities/session'
import { useGetProfile } from '@entities/user'
import { CopyPostLinkMenuItem } from '@features/post-copy-link'
import { DeletePostModal } from '@features/post-delete'
import { EditPostModal } from '@features/post-edit'
import { FollowUnfollowUserButton } from '@features/follow-unfollow-user'
import { ModalBase } from '@shared/ui/ModalBase'
import { CommentList } from '@widgets/comment-list'
import s from './PostModal.module.css'
import { useState } from 'react'
import { DropdownMenuCustom, DropdownMenuItem } from '@shared/ui/DropdownMenuCustom'
import { MoreHorizontal } from '@shared/ui/icons'
import { PostActions } from './PostActions'

type Props = {
  onClose: () => void
  openedPost: Post | undefined
}

export const PostModal = ({ onClose, openedPost }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { user, isAuthorized } = useSession()

  const isOwnPost = Boolean(openedPost && user?.userId === openedPost.ownerId)
  const ownerId = openedPost?.ownerId

  const { data: ownerProfile } = useGetProfile(
    ownerId ? String(ownerId) : undefined,
    Boolean(openedPost && !isOwnPost && isAuthorized),
  )

  const isFollowing = Boolean(
    ownerProfile && 'isFollowing' in ownerProfile && ownerProfile.isFollowing,
  )

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
              isAuthorized ? (
                <DropdownMenuCustom
                  ariaLabel="Open menu"
                  trigger={<MoreHorizontal width={24} height={24} className={s.iconMenu} />}
                >
                  {isOwnPost ? (
                    <>
                      <DropdownMenuItem onSelect={() => setIsDeleting(true)}>
                        Delete Post
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setIsEditing(true)}>
                        Edit Post
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <FollowUnfollowUserButton
                        userId={openedPost.ownerId}
                        isFollowing={isFollowing}
                        asMenuItem
                      />
                      <CopyPostLinkMenuItem postId={openedPost.id} />
                    </>
                  )}
                </DropdownMenuCustom>
              ) : null
            }
            comments={<CommentList />}
            postActions={<PostActions isLiked={openedPost.isLiked} postId={openedPost.id} />}
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
      {openedPost && (
        <DeletePostModal
          postId={openedPost.id}
          open={isDeleting}
          onClose={() => setIsDeleting(false)}

          onSuccess={() => {
            setIsDeleting(false)
            onClose()
          }}
        />
      )}
    </>
  )
}
