import { Post } from '../model/types'
import Image from 'next/image'
import s from './PostCard.module.css'

type Props = {
  post: Post
  onOpen: (id: number) => void
}

export const PostCard = ({ post, onOpen }: Props) => {
  const cover = post.images?.[0]

  return (
    <li onClick={() => onOpen(post.id)} className={s.card}>
      {cover && (
        <Image src={cover.url} alt={post.description || 'Post image'} fill className={s.img} />
      )}
    </li>
  )
}
