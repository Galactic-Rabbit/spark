import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from './getAllPosts'

// TODO: для ленты с бесконечным скроллом переделать на useInfiniteQuery:
// initialPageParam: 0, getNextPageParam — id последнего поста в items
// (или undefined, если items.length < pageSize — посты кончились).
// Тогда параметр endCursorPostId у хука не нужен — курсор передаёт сам React Query.
export const useGetAllPosts = (endCursorPostId: number) => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(endCursorPostId),
  })
}
