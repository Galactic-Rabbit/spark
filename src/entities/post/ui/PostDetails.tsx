import { ImageSlider } from '@shared/ui/ImageSlider'
import { ReactNode } from 'react'
import { Post } from '../model/types'

import { Input } from '@shared/ui/Input'
import { UserBadge, UserProfileLink } from '@entities/user'
import s from './PostDetails.module.css'
import { PostLikes } from './PostLikes'

type Props = {
  post: Post
  actions?: ReactNode
  comments?: ReactNode
  postActions?: ReactNode
}

//пока просто скелет

export const PostDetails = ({ post, actions, comments, postActions }: Props) => {
  return (
    <div className={s.wrapPost}>
      <ImageSlider images={post.images.map((image) => image.url)} />
      <div>
        <header>
          <UserProfileLink userId={post.ownerId}>
            <UserBadge avatar={post.avatarOwner} userName={post.userName} className={s.userBadge} />
          </UserProfileLink>
          {actions}
        </header>
        {comments}
        {postActions}
        <PostLikes postId={post.id}></PostLikes>
        <Input variant={'text'} />
      </div>
    </div>
  )
}
