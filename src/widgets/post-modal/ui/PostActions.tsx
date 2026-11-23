import { LikePost } from '@features/post-like'
import { IconButton } from '@shared/ui/IconButton'
import { Bookmark, PaperPlane } from '@shared/ui/icons'
import s from './PostActions.module.css'

type Props = {
  postId: number
  isLiked: boolean
}

export const PostActions = ({ postId, isLiked }: Props) => {
  return (
    <div className={s.actions}>
      <LikePost postId={postId} isLiked={isLiked} />
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
