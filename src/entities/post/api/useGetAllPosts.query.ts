import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllPosts } from './getAllPosts'

/*
  Лента с бесконечным скроллом: по 8 постов на страницу (pageSize отдаёт бэк).
  Первый запрос — endCursorPostId = 0, дальше — id последнего
  поста предыдущей пачки (его же возвращает getNextPageParam).
  Когда страница неполная (items.length < pageSize) — посты кончились, hasMore = false.
*/
export const useGetAllPosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getAllPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length < lastPage.pageSize) return undefined
      const lastPost = lastPage.items[lastPage.items.length - 1]
      return lastPost?.id
    },
  })
}
