import s from './EditPostModal.module.css'
import { Modal } from '@shared/ui/Modal'
import { ReactNode } from 'react'
import { ImageSlider } from '@shared/ui/ImageSlider'
import { UserBadge } from '@entities/user'
import { Input } from '@shared/ui/Input'
import { Post } from '@entities/post'

type Props = {
  open: boolean
  post: Post
  onOpenChange: () => void
}

export const EditPostModal = ({ open, post, onOpenChange }: Props) => {
  return (
    <Modal open={open} title="Editing post" onOpenChange={onOpenChange}>
      <div className={s.wrapPost}>
        <ImageSlider images={post.images.map((image) => image.url)} />
        <div>
          <UserBadge avatar={post.avatarOwner} userName={post.userName} className={s.userBadge} />
          <Input variant={'text'} />
          {/*  тут будет кнопка с типом submit и мутация будет запускаться по клику на эту кнопку*/}
        </div>
      </div>
    </Modal>
  )
}
