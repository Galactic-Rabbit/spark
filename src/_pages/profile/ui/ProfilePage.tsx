// import { useGetAllPosts } from '@entities/post'
// import { PostList } from '@widgets/post-list'

// Страница почти одинаковая и у юзера и у друзей/не друзей
// Поэтому я сделалf один компонент, который будет рендериться в зависимости от того, чей профиль мы смотрим
// page.tsx будет запрвшивать данные и передавать их пропсами,
// и на основании пропсов будем рендерить страницу профиля юзера или его друзей/не друзей
export const ProfilePage = () => {
  // Превью сетки квадратных карточек (PostThumbnail). Чтобы посмотреть — раскомментировать
  // импорты выше, этот блок и разметку ниже, и добавить 'use client' первой строкой файла.
  // TODO: публичная лента временно — заменить на посты пользователя (/posts/user/{userId}/{cursor})
  // const { data: posts } = useGetAllPosts(0)

  return (
    <div>
      Profile
      {/* <PostList posts={posts?.items} view="grid" /> */}
    </div>
  )
}
