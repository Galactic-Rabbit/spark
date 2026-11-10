import { UserAvatar } from './UserAvatar'
import s from './UserBadge.module.css'

type Props = {
  avatar: string
  userName: string
  className?: string
}

export const UserBadge = ({ avatar, userName, className }: Props) => {
  return (
    <div className={`${s.userWrap} ${className}`}>
      <UserAvatar avatar={avatar} userName={userName} />
      <h3 className="text-h3">{userName}</h3>
    </div>
  )
}
