import { useEffect, useRef } from 'react'

type Options = {
  /** есть ли следующая страница */
  hasMore?: boolean
  /** грузится ли прямо сейчас — блокирует повторный вызов */
  isLoadingMore?: boolean
  /** что делать, когда дошли до края */
  onLoadMore?: () => void
  /** за сколько px до дна начинать грузить */
  rootMargin?: string
}

export const useInfiniteScroll = ({
  hasMore,
  isLoadingMore,
  onLoadMore,
  rootMargin = '600px',
}: Options) => {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore || !onLoadMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoadingMore) onLoadMore()
      },
      { rootMargin },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, isLoadingMore, onLoadMore, rootMargin])

  return sentinelRef
}
