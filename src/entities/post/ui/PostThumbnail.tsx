import Image from 'next/image'
import { Post } from '../model/types'
import s from './PostThumbnail.module.css'

type Props = {
  post: Post
  onOpen: (id: number) => void
}

// Квадратная карточка для сетки (профиль, избранное): только первая картинка поста
export const PostThumbnail = ({ post, onOpen }: Props) => {
  const cover = post.images[0]

  return (
    <li onClick={() => onOpen(post.id)} className={s.thumbnail}>
      {cover && (
        <Image
          src={cover.url}
          alt={`Post by ${post.userName}`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={s.image}
        />
      )}
    </li>
  )
}
