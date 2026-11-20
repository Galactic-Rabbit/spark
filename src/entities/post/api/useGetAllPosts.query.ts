import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { getAllPosts } from './getAllPosts'
import { PostsPage } from '@entities/post'

/*
  Лента с бесконечным скроллом: по 8 постов на страницу (PAGE_SIZE в getAllPosts).
  Первый запрос — endCursorPostId = 0, дальше — id последнего поста предыдущей пачки.
  Конец ленты — пустая пачка (вернётся undefined). Сравнивать items.length с pageSize
  нельзя: бэк на страницах с курсором отдаёт на 1 пост меньше запрошенного,
  и «неполная» пачка не значит, что посты кончились.
*/
type Options = {
  /** первая пачка, отрендеренная сервером (SSG) — сеется в кэш, hydration без рефетча */
  initialData?: InfiniteData<PostsPage, number>
  /** сколько миллисекунд данные считаются свежими */
  staleTime?: number
}

export const useGetAllPosts = (options?: Options) => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getAllPosts(pageParam),
    initialPageParam: 0,
    // Бэк ждёт в endCursorPostId id последнего полученного поста, а не offset.
    // Конец ленты — пустая пачка (lastPost === undefined).
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage.items[lastPage.items.length - 1]
      return lastPost?.id
    },
    ...options,
  })
}
