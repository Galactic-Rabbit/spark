import { CommentItem, commentsMock } from '@entities/comment'

// пока мок; потом: const { data: comments } = useGetComments(postId)
export const CommentList = () => {
  return (
    <ul>
      {commentsMock.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  )
}
