import { Post } from '../model/types'
import Image from 'next/image'

type Props = {
  post: Post
  onOpen: (id: number) => void
}

export const PostCard = ({ post, onOpen }: Props) => {
  const cover = post.images[0]
  return (
    <li onClick={() => onOpen(post.id)}>
      {cover && <Image src={cover.url} alt={post.description} width={200} height={200} />}
      {post.description}
    </li>
  )
}
