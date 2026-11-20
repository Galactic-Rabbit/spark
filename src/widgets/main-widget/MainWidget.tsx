'use client'

import { useSession } from '@entities/session'
import { Post, useGetAllPosts } from '@entities/post'
import { PostList } from '@widgets/post-list'
import { RegisteredUsers } from '@widgets/registered-users'
import { useCallback } from 'react'

type Props = {
  initialPosts: Post[]
  totalUsers: number
}

export const MainWidget = ({ initialPosts, totalUsers }: Props) => {
  const { isAuthorized } = useSession()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAllPosts({
    initialData: {
      pages: [
        {
          items: initialPosts,
          totalUsers,
          totalCount: initialPosts.length,
          pageSize: initialPosts.length,
        },
      ],
      pageParams: [0],
    },
    staleTime: 60_000,
  })

  const allPosts = data?.pages.flatMap((page) => page.items)

  // Логика для гостей и авторизованных
  const postsToDisplay = isAuthorized ? allPosts : allPosts?.slice(0, 4)
  const canLoadMore = isAuthorized && hasNextPage

  const handleLoadMore = useCallback(() => fetchNextPage(), [fetchNextPage])

  // Берем актуальный totalUsers из кэша
  const currentTotalUsers = data?.pages[0]?.totalUsers ?? totalUsers ?? 0
  const formattedUsers = currentTotalUsers.toString().padStart(6, '0')

  return (
    <div>
      <RegisteredUsers>{formattedUsers}</RegisteredUsers>
      <PostList
        posts={postsToDisplay}
        hasMore={canLoadMore}
        isLoadingMore={isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />
    </div>
  )
}
