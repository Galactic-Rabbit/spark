import { useInfiniteQuery } from '@tanstack/react-query'
import { getUserPosts } from './getUserPosts'

/*
  Посты конкретного пользователя с бесконечным скроллом: по 8 постов на страницу.
  Первый запрос — endCursorPostId = 0, дальше — id последнего поста предыдущей пачки.
  Конец ленты — пустая пачка (вернётся undefined).
*/
export const useGetUserPosts = (userId: number) => {
  return useInfiniteQuery({
    queryKey: ['user-posts', userId],
    queryFn: ({ pageParam }) => getUserPosts(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage.items[lastPage.items.length - 1]
      return lastPost?.id
    },
    enabled: !!userId, // ← не запрашивать, если userId нет
  })
}
