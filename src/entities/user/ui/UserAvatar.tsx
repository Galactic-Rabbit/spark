import Image from 'next/image'
import s from './UserAvatar.module.css'
import { PersonFill } from '@shared/ui/icons'
const avatarSize = {
  xs: 24,
  small: 36,
  medium: 48,
  big: 204,
}

type Props = {
  avatar: string
  userName: string
  size?: keyof typeof avatarSize
}

export const UserAvatar = ({ avatar, userName, size = 'small' }: Props) => {
  if (!avatar) {
    return <PersonFill width={avatarSize[size]} height={avatarSize[size]} />
  }

  return (
    <Image
      src={avatar}
      alt={userName}
      width={avatarSize[size]}
      height={avatarSize[size]}
      className={s.avatar}
    />
  )
}
