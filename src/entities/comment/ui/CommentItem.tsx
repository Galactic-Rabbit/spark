import { ReactNode } from 'react'
import { UserAvatar, UserProfileLink } from '@entities/user'
import { formatTimeAgo } from '@shared/lib/formatTimeAgo'
import { Heart, HeartFill } from '@shared/ui/icons'
import { Comment } from '../model/types'
import s from './CommentItem.module.css'

type Props = {
  actions?: ReactNode //название слота - просто заглушка, дать более осмысленное
  comment: Comment
}

export const CommentItem = ({ actions, comment }: Props) => {
  return (
    <li className={s.item}>
      <UserProfileLink userId={comment.from.id}>
        <UserAvatar avatar={comment.from.avatars[0]?.url ?? ''} userName={comment.from.username} />
      </UserProfileLink>
      <div className={s.body}>
        <p className={`text-regular-sm ${s.text}`}>
          <strong>{comment.from.username}</strong> {comment.content}
        </p>
        <div className={`text-small ${s.meta}`}>
          <time dateTime={comment.createdAt}>{formatTimeAgo(comment.createdAt)}</time>
          {comment.likeCount > 0 && <span>Like: {comment.likeCount}</span>}
          {actions}
        </div>
      </div>
      <span className={comment.isLiked ? s.liked : s.likeIcon} aria-hidden="true">
        {comment.isLiked ? <HeartFill width={16} height={16} /> : <Heart width={16} height={16} />}
      </span>
    </li>
  )
}
