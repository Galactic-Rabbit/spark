import { useEffect, useRef } from 'react'

type Options = {
  hasMore?: boolean
  isLoadingMore?: boolean
  isErrorLoadMore?: boolean // <--- ДОБАВИЛИ
  onLoadMore?: () => void
  rootMargin?: string
}

export const useInfiniteScroll = ({
  hasMore,
  isLoadingMore,
  isErrorLoadMore, // <--- ДОБАВИЛИ
  onLoadMore,
  rootMargin = '600px',
}: Options) => {
  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMoreRef = useRef(onLoadMore)
  const isLoadingRef = useRef(isLoadingMore)
  const isErrorRef = useRef(isErrorLoadMore) // <--- ДОБАВИЛИ
  // Запоминаем, находится ли сентинел в зоне видимости прямо сейчас
  const isIntersectingRef = useRef(false)

  useEffect(() => {
    loadMoreRef.current = onLoadMore
    isLoadingRef.current = isLoadingMore
    isErrorRef.current = isErrorLoadMore // <--- ДОБАВИЛИ
  })

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        isIntersectingRef.current = entries[0]?.isIntersecting ?? false

        // Если сентинел виден, мы не грузимся прямо сейчас и НЕТ ОШИБКИ — грузим
        if (
          isIntersectingRef.current &&
          !isLoadingRef.current &&
          !isErrorRef.current // <--- ДОБАВИЛИ
        ) {
          loadMoreRef.current?.()
        }
      },
      { rootMargin },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, rootMargin])

  // Ловушка «пересечения без перехода»
  useEffect(() => {
    // Если есть ошибка, мы НЕ вызываем onLoadMore автоматически
    if (isLoadingMore || !hasMore || isErrorLoadMore) return // <--- ДОБАВИЛИ isErrorLoadMore
    if (!isIntersectingRef.current) return
    if (!sentinelRef.current) return

    loadMoreRef.current?.()
  }, [isLoadingMore, hasMore, isErrorLoadMore]) // <--- ДОБАВИЛИ в зависимости

  return sentinelRef
}
