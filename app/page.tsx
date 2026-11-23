import { getLatestPosts } from '@entities/post/api/getLatestPosts.server'
import { MainPage } from '@pages/main'

/*
  Главная — публичная страница: рендерится на сервере (SSG/ISR).
  revalidate = 60 → раз в минуту страница пересобирается в фоне с новыми постами.
  getLatestPosts импортируем напрямую из модуля (не через barrel @entities/post),
  чтобы серверный fetch случайно не попадал в клиентские бандлы.
*/
export const revalidate = 60

export default async function Page() {
  const { posts, totalUsers, error } = await getLatestPosts(4)

  return <MainPage initialPosts={posts} totalUsers={totalUsers} serverError={error} />
}
