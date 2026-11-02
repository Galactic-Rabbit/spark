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
  const cover = post.images[0] //временное решение, должен быть слайдер, который переберет все фото из массива
  return (
    <div>
      <Image src={cover.url} alt={post.description} width={200} height={200} />
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
