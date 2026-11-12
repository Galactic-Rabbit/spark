'use client'

import { useParams } from 'next/navigation'
import { useSession } from '@entities/session'
import { useGetProfile } from '@entities/user'
import { ProfileHeader } from '@widgets/profile-header'

// import { useGetAllPosts } from '@entities/post'
// import { PostList } from '@widgets/post-list'

// Страница почти одинаковая и у юзера и у друзей/не друзей
// Поэтому я сделал один компонент, который будет рендериться в зависимости от того, чей профиль мы смотрим
// page.tsx будет запрвшивать данные и передавать их пропсами,
// и на основании пропсов будем рендерить страницу профиля юзера или его друзей/не друзей
export const ProfilePage = () => {
  const params = useParams()
  const { user: currentUser } = useSession()
  const profileId = params?.id as string | undefined

  // Получаем профиль: свой или чужой
  const { data: profile, isLoading, isError } = useGetProfile(profileId)

  // Превью сетки квадратных карточек (PostThumbnail). Чтобы посмотреть — раскомментировать
  // импорты выше, этот блок и разметку ниже, и добавить 'use client' первой строкой файла.
  // TODO: публичная лента временно — заменить на посты пользователя (/posts/user/{userId}/{cursor})
  // const { data: posts } = useGetAllPosts(0)

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

  return (
    <div>
      <ProfileHeader user={profileForHeader} isOwnProfile={isOwnProfile} />
      {/* <PostList posts={posts?.items} view="grid" /> */}
    </div>
  )
}
