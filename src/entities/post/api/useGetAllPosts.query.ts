import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllPosts } from './getAllPosts'

/*
  Лента с бесконечным скроллом: по 8 постов на страницу (PAGE_SIZE в getAllPosts).
  Первый запрос — endCursorPostId = 0, дальше — id последнего поста предыдущей пачки.
  Конец ленты — пустая пачка (вернётся undefined). Сравнивать items.length с pageSize
  нельзя: бэк на страницах с курсором отдаёт на 1 пост меньше запрошенного,
  и «неполная» пачка не значит, что посты кончились.
*/
export const useGetAllPosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getAllPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage.items[lastPage.items.length - 1]
      return lastPost?.id
    },
  })
}
