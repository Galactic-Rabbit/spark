import { ImageSlider } from '@shared/ui/ImageSlider'
import { ReactNode } from 'react'
import { Post } from '../model/types'

import { Input } from '@shared/ui/Input'
import { UserAvatar, UserBadge, UserProfileLink } from '@entities/user'
import { formatTimeAgo } from '@shared/lib/formatTimeAgo'
import s from './PostDetails.module.css'
import { PostLikes } from './PostLikes'

type Props = {
  post: Post
  postMenu?: ReactNode
  comments?: ReactNode
  postActions?: ReactNode
}

export const PostDetails = ({ post, postMenu, comments, postActions }: Props) => {
  return (
    <div className={s.wrapPost}>
      <ImageSlider
        images={post.images.map((image) => image.url)}
        className={s.slider}
        fit="cover"
      />
      <div className={s.content}>
        <header className={s.header}>
          <UserProfileLink userId={post.ownerId}>
            <UserBadge avatar={post.avatarOwner} userName={post.userName} className={s.userBadge} />
          </UserProfileLink>
          {postMenu}
        </header>
        <div className={s.comments}>
          {post.description && (
            <div className={s.caption}>
              <UserProfileLink userId={post.ownerId}>
                <UserAvatar avatar={post.avatarOwner} userName={post.userName} />
              </UserProfileLink>
              <div>
                <p className="text-regular-sm">
                  <strong>{post.userName}</strong> {post.description}
                </p>
                <time className={`text-small ${s.captionTime}`} dateTime={post.createdAt}>
                  {formatTimeAgo(post.createdAt)}
                </time>
              </div>
            </div>
          )}
          {comments}
        </div>
        <footer className={s.footer}>
          {postActions}
          <PostLikes postId={post.id} />
          <div className={s.composer}>
            <Input variant="text" placeholder="Add a Comment..." aria-label="Add a Comment" />
            <button type="button" className={s.publish} disabled>
              Publish
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
