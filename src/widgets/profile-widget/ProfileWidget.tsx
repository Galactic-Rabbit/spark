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

  // Получаем профиль: свой или чужой
  const { data: profile, isLoading, isError } = useGetProfile(profileId)

  // посты пользователя
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserPosts(profile?.id ?? 0)

  // бесконечный скролл
  const sentinelRef = useInfiniteScroll({
    hasMore: hasNextPage,
    isLoadingMore: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  })
  // TODO: публичная лента временно — заменить на посты пользователя (/posts/user/{userId}/{cursor})

  if (isLoading) return <div>Загрузка...</div>
  if (isError || !profile) return <div>Ошибка загрузки профиля</div>

  // Свой ли это профиль
  const isOwnProfile = !profileId || currentUser?.userId === profile.id

  // Собираем данные для шапки:
  // для своего профиля userMetadata и флаги подписки отсутствуют,
  // поэтому подставляем безопасные значения по умолчанию
  const profileForHeader = {
    ...profile,
    aboutMe: profile.aboutMe ?? '', // ← приводим null к пустой строке
    userMetadata: 'userMetadata' in profile ? profile.userMetadata : undefined,
    hasPaymentSubscription:
      'hasPaymentSubscription' in profile ? profile.hasPaymentSubscription : false,
    isFollowing: 'isFollowing' in profile ? profile.isFollowing : false,
    isFollowedBy: 'isFollowedBy' in profile ? profile.isFollowedBy : false,
  }
  // собираем все посты из всех страниц
  const posts = postsData?.pages.flatMap((page) => page.items ?? []) ?? []

  return (
    <div>
      <ProfileHeader user={profileForHeader} isOwnProfile={isOwnProfile} />
      <PostList posts={posts} view="grid" />
      <div ref={sentinelRef} style={{ height: '1px' }} />
    </div>
  )
}
