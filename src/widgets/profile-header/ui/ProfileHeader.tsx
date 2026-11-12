'use client'

import { UserAvatar } from '@entities/user'
import { Button } from '@shared/ui/Button'
import type { PublicProfileViewModel } from '@entities/user'
import s from './ProfileHeader.module.css'

type ProfileHeaderProps = {
  user: Partial<PublicProfileViewModel> & { userName: string }
  isOwnProfile: boolean
}

export const ProfileHeader = ({ user, isOwnProfile }: ProfileHeaderProps) => {
  const avatarUrl = user.avatars?.[0]?.url || ''

  return (
    <div className={s.header}>
      <div className={s.avatarWrapper}>
        <UserAvatar avatar={avatarUrl} userName={user.userName} size="big" />
      </div>

      <div className={s.info}>
        <div className={s.topRow}>
          <div className={s.usernameWrapper}>
            <h1 className={s.username}>{user.userName}</h1>
            {user.hasPaymentSubscription && <span className={s.paidBadge}>⭐</span>}
          </div>

          {isOwnProfile ? (
            <Button variant="secondary" className={s.actionButton}>
              Profile Settings
            </Button>
          ) : (
            <div className={s.actions}>
              <Button variant="primary" className={s.actionButton}>
                {user.isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
              <Button variant="secondary" className={s.actionButton}>
                Send Message
              </Button>
            </div>
          )}
        </div>

        {/* Счётчики */}
        {user.userMetadata && (
          <div className={s.stats}>
            <div className={s.statItem}>
              <span className={s.statValue}>{user.userMetadata.following}</span>
              <span className={s.statLabel}>Following</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statValue}>{user.userMetadata.followers}</span>
              <span className={s.statLabel}>Followers</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statValue}>{user.userMetadata.publications}</span>
              <span className={s.statLabel}>Publications</span>
            </div>
          </div>
        )}

        {user.aboutMe && <p className={s.aboutMe}>{user.aboutMe}</p>}
      </div>
    </div>
  )
}
