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
  // Запоминаем, находится ли сентинел в зоне видимости прямо сейчас
  const isIntersectingRef = useRef(false)

  useEffect(() => {
    loadMoreRef.current = onLoadMore
    isLoadingRef.current = isLoadingMore
  })

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        isIntersectingRef.current = entries[0]?.isIntersecting ?? false

        // Если сентинел виден и мы не грузимся прямо сейчас — грузим
        if (isIntersectingRef.current && !isLoadingRef.current) {
          loadMoreRef.current?.()
        }
      },
      { rootMargin },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, rootMargin])

  // Ловушка «пересечения без перехода»: после загрузки пачки сентинел смещается
  // вниз, но часто остаётся внутри зоны rootMargin. Тогда IntersectionObserver
  // не шлёт новый колбэк (состояние не изменилось) и подгрузка вставала бы навсегда.
  // Как только пачка долетела (isLoadingMore true -> false) — перепроверяем.
  useEffect(() => {
    if (isLoadingMore || !hasMore) return
    if (!isIntersectingRef.current) return
    if (!sentinelRef.current) return

    loadMoreRef.current?.()
  }, [isLoadingMore, hasMore])

  return sentinelRef
}
