'use client'

import { useState, type MouseEvent } from 'react'
import { UserBadge } from '@entities/user'
import { ImageSlider } from '@shared/ui/ImageSlider'
import { formatTimeAgo } from '@shared/lib/formatTimeAgo'
import { Post } from '../model/types'
import s from './PostCard.module.css'

// Сколько символов описания видно в свёрнутом виде (≈3 строки по макету)
const DESCRIPTION_LIMIT = 70

type Props = {
  post: Post
  onOpen: (id: number) => void
}

export const PostCard = ({ post, onOpen }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isLong = post.description.length > DESCRIPTION_LIMIT
  const description =
    isExpanded || !isLong ? post.description : `${post.description.slice(0, DESCRIPTION_LIMIT)}...`

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation() // иначе клик всплывёт до <li> и откроет модалку поста
    setIsExpanded((prev) => !prev)
  }

  return (
    <li onClick={() => onOpen(post.id)} className={s.card}>
      <ImageSlider
        images={post.images.map((image) => image.url)}
        className={s.slider}
        fit="cover"
      />
      <UserBadge avatar={post.avatarOwner} userName={post.userName} />
      <time className={`text-small ${s.time}`} dateTime={post.createdAt}>
        {formatTimeAgo(post.createdAt)}
      </time>
      {post.description && (
        <p className={`text-regular-sm ${s.description}`}>
          {description}{' '}
          {isLong && (
            <button type="button" className={`link-regular ${s.toggle}`} onClick={handleToggle}>
              {isExpanded ? 'Hide' : 'Show more'}
            </button>
          )}
        </p>
      )}
    </li>
  )
}
