import s from './NotificationBadge.module.css'
import { Bell } from '@shared/ui/icons'

export const NotificationBadge = () => {
  return (
    <div className={s.notificationButton}>
      <Bell width={18} height={20} />
      <span className={s.badge}>1</span>
    </div>
  )
}
