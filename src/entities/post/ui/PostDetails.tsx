import { ImageSlider } from '@shared/ui/ImageSlider'
import { ReactNode } from 'react'
import { Post } from '../model/types'
import Image from 'next/image'
import { Input } from '@shared/ui/Input'

type Props = {
  post: Post
  actions?: ReactNode
}

//пока просто скелет

export const PostDetails = ({ post, actions }: Props) => {
  return (
    <div>
      <ImageSlider images={post.images.map((image) => image.url)} />
      <header>
        <Image src={post.avatarOwner} alt={post.userName} width={50} height={50} />
        <p>{post.userName}</p>
        {actions} {/* ← «место»: что положат, то и нарисуется */}
      </header>
      <ul>Список комментариев</ul>
      <div>Блок с лайками, поделиться и пр.</div>
      <Input variant={'text'} />
    </div>
  )
}
