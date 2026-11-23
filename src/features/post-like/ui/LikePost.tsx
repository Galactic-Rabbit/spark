import { Heart, HeartFill } from '@shared/ui/icons'
import { IconButton } from '@shared/ui/IconButton'
import s from './LikePost.module.css'
import { useState } from 'react'
import { isApiError } from '@shared/api/apiError'
import { useUpdateLikePostMutation } from '../api/useUpdateLikePost.mutation'

type Props = {
  postId: number
  isLiked: boolean
}

export const LikePost = ({ isLiked, postId }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const { mutateAsync: likedMutation, isPending } = useUpdateLikePostMutation()
  const handleLike = async (postId: number) => {
    setError(null)
    try {
      if (isLiked) {
        await likedMutation({ postId, likeStatus: 'NONE' })
      } else {
        await likedMutation({ postId, likeStatus: 'LIKE' })
      }
    } catch (error) {
      setError(isApiError(error) ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <IconButton
        className={`${s.likeButton} ${isLiked ? s.liked : ''}`}
        aria-label="Like post"
        aria-pressed={isLiked}
        onClick={() => handleLike(postId)}
        disabled={isPending}
      >
        {isLiked ? <HeartFill width={24} height={24} /> : <Heart width={24} height={24} />}
      </IconButton>
      {error && (
        <p className={`text-regular-sm ${s.error}`} role="alert">
          {error}
        </p>
      )}
    </>
  )
}
