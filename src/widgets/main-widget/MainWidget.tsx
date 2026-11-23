'use client'

import { useSession } from '@entities/session'
import { Post, useGetAllPosts } from '@entities/post'
import { PostList } from '@widgets/post-list'
import { RegisteredUsers } from '@widgets/registered-users'
import { isApiError } from '@shared/api/apiError'
import { Button } from '@shared/ui/Button'
import { useCallback } from 'react'
import s from './MainWidget.module.css'

type Props = {
  initialPosts: Post[]
  totalUsers: number
  serverError?: string | null
}

export const MainWidget = ({ initialPosts, totalUsers, serverError }: Props) => {
  const { isAuthorized } = useSession()

  // Если серверный сид упал, пустую ленту не сеем: клиент делает свой запрос,
  // а повторная загрузка (refetch) не ждёт ISR-ревалидации страницы.
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError, // <--- ДОСТАЕМ ФЛАГ ОШИБКИ ПОДГРУЗКИ
  } = useGetAllPosts(
    serverError
      ? undefined
      : {
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
        },
  )

  const allPosts = data?.pages.flatMap((page) => page.items)
  const postsToDisplay = isAuthorized ? allPosts : allPosts?.slice(0, 4)
  const canLoadMore = isAuthorized && hasNextPage
  const handleLoadMore = useCallback(() => fetchNextPage(), [fetchNextPage])

  const currentTotalUsers = data?.pages[0]?.totalUsers ?? (serverError ? undefined : totalUsers)
  const formattedUsers =
    currentTotalUsers === undefined ? '------' : currentTotalUsers.toString().padStart(6, '0')

  // Текст клиентской ошибки; если ApiError нет, берём сообщение серверного сида.
  const errorText = isApiError(error)
    ? error.message
    : (serverError ?? 'Something went wrong. Please try again.')

  // 1. Первичная загрузка (лоадер)
  if (isPending) {
    return (
      <div className={s.errorServer}>
        <p className="text-regular">Loading posts...</p>
      </div>
    )
  }

  // 2. Глобальная ошибка (лента вообще не загрузилась)
  if (isError && !data) {
    return (
      <div className={s.errorServer}>
        <p className={`text-regular-sm ${s.error}`} role="alert">
          {errorText}
        </p>
        <Button variant="textButton" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  // 3. Основной рендер (лента есть, возможно с ошибкой подгрузки)
  return (
    <div>
      <RegisteredUsers>{formattedUsers}</RegisteredUsers>

      <PostList
        posts={postsToDisplay}
        hasMore={canLoadMore}
        isLoadingMore={isFetchingNextPage}
        isErrorLoadMore={isFetchNextPageError} // <--- ПЕРЕДАЕМ В POSTLIST
        onLoadMore={handleLoadMore}
      />

      {/* Ошибка догрузки следующей страницы: лента уже есть, не прячем её */}
      {isFetchNextPageError && (
        <div className={s.errorServer}>
          <p className={`text-regular-sm ${s.error}`} role="alert">
            Failed to load more posts. {/* Можно использовать errorText */}
          </p>
          <Button
            variant="textButton"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {' '}
            {/* <--- ВЫЗЫВАЕМ FETCHNEXTPAGE */}
            Try again
          </Button>
        </div>
      )}
    </div>
  )
}
