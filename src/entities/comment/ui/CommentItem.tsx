import { ReactNode } from 'react'
import { Comment } from '../model/types'

type Props = {
  actions?: ReactNode //название слота - просто заглушка, дать более осмысленное
  comment: Comment
}

export const CommentItem = ({ actions, comment }: Props) => {
  return (
    <li>
      <p>{comment.from.username}</p>
      <p>{comment.content}</p>
      <p>{actions}</p>
      <hr />
      {/* сюда через эту "дырку" придут фичи, лайк, дизлайк, ответ на комментарий и т.д. Она нужна т.к. по правилам FSD мы не можем импортировать фичи в сущности, обходной путь - положить фичу в "дырку" через виджет, в него можно импортировать и фичи и сущности  */}
    </li>
  )
}
