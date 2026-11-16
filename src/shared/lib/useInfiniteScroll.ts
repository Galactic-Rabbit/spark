import { useEffect, useRef } from 'react'

type Options = {
  hasMore?: boolean
  isLoadingMore?: boolean
  onLoadMore?: () => void
  rootMargin?: string
}

export const useInfiniteScroll = ({
  hasMore,
  isLoadingMore,
  onLoadMore,
  rootMargin = '600px',
}: Options) => {
  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMoreRef = useRef(onLoadMore)
  const isLoadingRef = useRef(isLoadingMore)

  useEffect(() => {
    loadMoreRef.current = onLoadMore
    isLoadingRef.current = isLoadingMore
  })

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoadingRef.current) {
          loadMoreRef.current?.()
        }
      },
      { rootMargin },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, rootMargin]) // Убрали isLoadingMore и onLoadMore!

  return sentinelRef
}
