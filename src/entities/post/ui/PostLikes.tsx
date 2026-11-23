import s from './PostLikes.module.css'
import { UserAvatar } from '@entities/user'
import { formatTimeAgo } from '@shared/lib/formatTimeAgo'
import { useGetPostLikes } from '../api/useGetPostLikes.query'

type Props = {
  postId: number
}

export const PostLikes = ({ postId }: Props) => {
  const { data: postLikes } = useGetPostLikes(postId)

  if (postLikes?.totalCount === 0) {
    return (
      <span className={`text-small ${s.empty}`}>No one has liked this post yet. Be the first!</span>
    )
  }

  const latestLike = postLikes?.items?.length
    ? postLikes.items.reduce((latest, user) =>
        new Date(user.createdAt).getTime() > new Date(latest.createdAt).getTime() ? user : latest,
      )
    : undefined

  return (
    <div className={s.root}>
      <div className={s.row}>
        <ul className={s.avatars} aria-label="Users who liked this post">
          {postLikes?.items?.slice(0, 3).map((user) => (
            <li key={user.userId}>
              <UserAvatar avatar={user.avatars[0]?.url ?? ''} userName={user.userName} size="xs" />
            </li>
          ))}
        </ul>
        <p className="text-regular-sm">
          {postLikes?.totalCount.toLocaleString('ru-RU')} &quot;<strong>Likes</strong>&quot;
        </p>
      </div>
      {latestLike && (
        <span className={`text-small ${s.meta}`}>
          Liked by {latestLike.userName} ·{' '}
          <time dateTime={latestLike.createdAt}>{formatTimeAgo(latestLike.createdAt)}</time>
        </span>
      )}
    </div>
  )
}
