/* Сылка пока не работает так как не реализован роут */

export const getPostLink = (postId: number) => `${window.location.origin}/post/${postId}`

export const copyPostLink = async (postId: number) => {
  const link = getPostLink(postId)

  await navigator.clipboard.writeText(link)

  return link
}
