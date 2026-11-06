const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' })

export const formatTimeAgo = (iso: string) => {
  const sec = Math.round((new Date(iso).getTime() - Date.now()) / 1000) // отрицательное = в прошлом
  if (Math.abs(sec) < 60) return rtf.format(sec, 'second')
  const min = Math.round(sec / 60)
  if (Math.abs(min) < 60) return rtf.format(min, 'minute')
  const h = Math.round(min / 60)
  if (Math.abs(h) < 24) return rtf.format(h, 'hour')
  return rtf.format(Math.round(h / 24), 'day')
}
