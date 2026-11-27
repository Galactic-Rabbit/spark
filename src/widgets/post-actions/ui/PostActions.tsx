import { LikePost } from '@features/post-like'
import { IconButton } from '@shared/ui/IconButton'
import { Bookmark, MessageCircle, PaperPlane } from '@shared/ui/icons'
import s from './PostActions.module.css'

type PostActionsVariant = 'all' | 'no-message'

type Props = {
  postId: number
  isLiked: boolean
  variant: PostActionsVariant
}

export const PostActions = ({ postId, isLiked, variant }: Props) => {
  return (
    <div className={s.actions}>
      <LikePost postId={postId} isLiked={isLiked} />
      {variant === 'all' && (
        <IconButton className={s.iconButton} aria-label="Write message">
          <MessageCircle width={24} height={24} />
        </IconButton>
      )}
      <IconButton className={s.iconButton} aria-label="Share post">
        <PaperPlane width={24} height={24} />
      </IconButton>
      <IconButton
        className={`${s.iconButton} ${s.bookmarkButton}`}
        aria-label="Add post to favorites"
      >
        <Bookmark width={24} height={24} />
      </IconButton>
    </div>
  )
}
