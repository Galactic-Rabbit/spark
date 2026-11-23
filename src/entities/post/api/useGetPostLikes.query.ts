import { useQuery } from '@tanstack/react-query'
import { getPostLikes } from '@entities/post/api/getPostLikes'

export const useGetPostLikes = (postId: number) => {
  return useQuery({
    queryKey: ['post-likes', postId],
    queryFn: () => getPostLikes(postId),
    enabled: postId > 0,
  })
}
