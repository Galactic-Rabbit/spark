'use client'

import { ProfileHeader } from '@widgets/profile-header'
import { PostList } from '@widgets/post-list'
import { useParams } from 'next/navigation'
import { useGetProfile } from '@entities/user'
import { useGetUserPosts } from '@entities/post'
import { useInfiniteScroll } from '@shared/lib/useInfiniteScroll'
import { useSession } from '@entities/session'

export const ProfileWidget = () => {
  const params = useParams()
  const { user: currentUser } = useSession()
  const profileId = params?.id as string | undefined

  const { data: profile, isLoading, isError } = useGetProfile(profileId)

  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserPosts(profile?.id ?? 0)

  const sentinelRef = useInfiniteScroll({
    hasMore: hasNextPage,
    isLoadingMore: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  })

  if (isLoading) return <div>Загрузка...</div>
  if (isError || !profile) return <div>Ошибка загрузки профиля</div>

  const isOwnProfile = !profileId || currentUser?.userId === profile.id

  const posts = postsData?.pages.flatMap((page) => page.items ?? []) ?? []

  return (
    <div>
      <ProfileHeader user={profile} isOwnProfile={isOwnProfile} />
      <PostList posts={posts} view="grid" />
      <div ref={sentinelRef} style={{ height: '1px' }} />
    </div>
  )
}
