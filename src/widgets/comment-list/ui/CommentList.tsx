import { CommentItem, commentsMock } from '@entities/comment'
import s from './CommentList.module.css'

// пока мок; потом: const { data: comments } = useGetComments(postId)
export const CommentList = () => {
  return (
    <ul className={s.list}>
      {commentsMock.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  )
}
