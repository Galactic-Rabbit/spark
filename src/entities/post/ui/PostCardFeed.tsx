import s from './PostCardFeed.module.css'
import { UserAvatar, UserBadge, UserProfileLink } from '@entities/user'
import { ImageSlider } from '@shared/ui/ImageSlider'
import { formatTimeAgo } from '@shared/lib/formatTimeAgo'
import { PostLikes } from '@entities/post/ui/PostLikes'
import { Input } from '@shared/ui/Input'
import { Post } from '@entities/post'
import { ReactNode, useState } from 'react'
import { Button } from '@shared/ui/Button'

type Props = { post: Post; postMenu?: ReactNode; comments?: ReactNode; postActions?: ReactNode }

export const PostCardFeed = ({ post, postMenu, comments, postActions }: Props) => {
  const [isViewComments, setIsViewComments] = useState(false)

  return (
    <li className={s.card}>
      <header className={s.header}>
        <UserProfileLink userId={post.ownerId}>
          <UserBadge avatar={post.avatarOwner} userName={post.userName} />
        </UserProfileLink>
        <time className={`text-small ${s.captionTime}`} dateTime={post.createdAt}>
          {formatTimeAgo(post.createdAt)}
        </time>
        {postMenu}
      </header>
      <ImageSlider
        images={post.images.map((image) => image.url)}
        className={s.slider}
        fit="cover"
      />
      <div className={s.actions}>{postActions}</div>
      {post.description && (
        <div className={s.caption}>
          <UserProfileLink userId={post.ownerId}>
            <UserAvatar avatar={post.avatarOwner} userName={post.userName} />
          </UserProfileLink>
          <p className="text-regular-sm">
            <strong>{post.userName}</strong> {post.description}
          </p>
        </div>
      )}
      <div className={s.likes}>
        <PostLikes postId={post.id} />
      </div>
      <Button
        className={s.commentsButton}
        variant={'textButton'}
        disabled
        onClick={() => {
          setIsViewComments(true)
        }}
      >
        View All Comments (114)
        {/*  что бы вывести количество коммитов в кнопке, надо запросить коммиты по каждому посту...
        а если юзер не посмотрит мы кучу лишних запросов сделаем, фигня какая-то подумать еще.
        */}
      </Button>
      {isViewComments && comments}
      <div className={s.composer}>
        <Input variant="text" placeholder="Add a Comment..." aria-label="Add a Comment" />
        <Button className={s.publish} variant={'textButton'} type="submit" disabled>
          Publish
        </Button>
      </div>
    </li>
  )
}
