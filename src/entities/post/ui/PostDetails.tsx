import { ImageSlider } from '@shared/ui/ImageSlider'
import { ReactNode } from 'react'
import { Post } from '../model/types'

import { Input } from '@shared/ui/Input'
import { UserBadge } from '@entities/user'
import s from './PostDetails.module.css'

type Props = {
  post: Post
  actions?: ReactNode
  comments?: ReactNode
}

//пока просто скелет

export const PostDetails = ({ post, actions, comments }: Props) => {
  return (
    <div className={s.wrapPost}>
      <ImageSlider images={post.images.map((image) => image.url)} />
      <div>
        <header>
          <UserBadge avatar={post.avatarOwner} userName={post.userName} className={s.userBadge} />
          {actions} {/* ← «место»: что положат, то и нарисуется */}
        </header>
        {comments}
        <div>Блок с лайками, поделиться и пр.</div>
        <Input variant={'text'} />
      </div>
    </div>
  )
}
