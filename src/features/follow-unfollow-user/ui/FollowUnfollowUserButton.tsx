'use client'

import { Button } from '@shared/ui/Button'
import { DropdownMenuItem } from '@shared/ui/DropdownMenuCustom'
import { PersonAdd, PersonRemove } from '@shared/ui/icons'
import { useFollowUser, useUnfollowUser } from '../model/useFollowUnfollowUser'
import s from './FollowUnfollowUserButton.module.css'

type Props = {
  userId: number
  isFollowing: boolean
  asMenuItem?: boolean
  className?: string
  onSuccess?: () => void
}

export const FollowUnfollowUserButton = ({
  userId,
  isFollowing,
  asMenuItem = false,
  className,
  onSuccess,
}: Props) => {
  const { mutateAsync: follow, isPending: isFollowPending } = useFollowUser()
  const { mutateAsync: unfollow, isPending: isUnfollowPending } = useUnfollowUser()

  const isPending = isFollowPending || isUnfollowPending
  const label = isFollowing ? 'Unfollow' : 'Follow'
  const Icon = isFollowing ? PersonRemove : PersonAdd

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollow(userId)
      } else {
        await follow(userId)
      }
      onSuccess?.()
    } catch (error) {
      console.error('Failed to change follow state', error)
    }
  }

  if (asMenuItem) {
    return (
      <DropdownMenuItem disabled={isPending} onSelect={handleFollowToggle}>
        <Icon width={24} height={24} className={s.menuIcon} />
        {label}
      </DropdownMenuItem>
    )
  }

  return (
    <Button
      variant={isFollowing ? 'secondary' : 'primary'}
      className={className}
      onClick={handleFollowToggle}
      disabled={isPending}
    >
      {label}
    </Button>
  )
}
