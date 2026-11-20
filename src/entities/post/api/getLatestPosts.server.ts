import { PostsPage } from '../model/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

/*
  Серверный запрос публичных постов (для SSG/ISR главной страницы).
  Вызывается из серверного компонента app/page.tsx, поэтому:
  - НЕ через apiClient: он клиентский (токены из браузерного storage + refresh недоступны на сервере);
  - голый fetch с опцией next.revalidate — она включает кэш и обновление страницы раз в минуту (ISR).
  Тип ответа тот же PostsPage, что и у клиентского getAllPosts (в сваггере у /posts/all он не описан).
*/
export const getLatestPosts = async (pageSize: number) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/public-posts/all/0?pageSize=${pageSize}&sortBy=id&sortDirection=desc`,
      { next: { revalidate: 60 } },
    )
    if (!res.ok) throw new Error(`Failed to fetch latest posts: ${res.status}`)

    const data = (await res.json()) as PostsPage
    return { posts: data.items, totalUsers: data.totalUsers }
  } catch {
    // Бэк недоступен (например, во время next build) — не роняем сборку,
    // отдаём пустую страницу: клиент потом дозапросит посты через react-query.
    return { posts: [], totalUsers: 0 }
  }
}
