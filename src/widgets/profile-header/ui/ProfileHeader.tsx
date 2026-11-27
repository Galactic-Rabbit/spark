'use client'

import type { PublicProfileViewModel } from '@entities/user'
import { ProfileViewModel, UserAvatar } from '@entities/user'
import { Button } from '@shared/ui/Button'
import s from './ProfileHeader.module.css'

type ProfileHeaderProps = {
  user: ProfileViewModel | PublicProfileViewModel
  isOwnProfile: boolean
}

export const ProfileHeader = ({ user, isOwnProfile }: ProfileHeaderProps) => {
  const avatarUrl = user.avatars?.[0]?.url || ''

  const userMetadata = 'userMetadata' in user ? user.userMetadata : undefined

  const hasPaymentSubscription =
    'hasPaymentSubscription' in user ? user.hasPaymentSubscription : false

  const isFollowing = 'isFollowing' in user ? user.isFollowing : false

  return (
    <div className={s.header}>
      <div className={s.avatarWrapper}>
        <UserAvatar avatar={avatarUrl} userName={user.userName} size="big" />
      </div>

      <div className={s.info}>
        <div className={s.topRow}>
          <div className={s.usernameWrapper}>
            <h1 className={s.username}>{user.userName}</h1>
            {hasPaymentSubscription && <span className={s.paidBadge}>⭐</span>}
          </div>

          {isOwnProfile ? (
            <Button variant="secondary" className={s.actionButton}>
              Profile Settings
            </Button>
          ) : (
            <div className={s.actions}>
              <Button variant="primary" className={s.actionButton}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
              <Button variant="secondary" className={s.actionButton}>
                Send Message
              </Button>
            </div>
          )}
        </div>

        {/* Счётчики */}
        {userMetadata && (
          <div className={s.stats}>
            <div className={s.statItem}>
              <span className={s.statValue}>{userMetadata.following}</span>
              <span className={s.statLabel}>Following</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statValue}>{userMetadata.followers}</span>
              <span className={s.statLabel}>Followers</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statValue}>{userMetadata.publications}</span>
              <span className={s.statLabel}>Publications</span>
            </div>
          </div>
        )}

        {user.aboutMe && <p className={s.aboutMe}>{user.aboutMe}</p>}
      </div>
    </div>
  )
}
