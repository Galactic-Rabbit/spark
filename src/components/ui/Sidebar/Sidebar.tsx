'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import s from './Sidebar.module.css'
import {
  Bookmark,
  BookmarkFill,
  Home,
  HomeFill,
  LogOut,
  MessageCircle,
  MessageCircleFill,
  Person,
  PersonFill,
  PlusSquare,
  PlusSquareFill,
  Search,
  TrendingUp,
} from '@/assets/icons'

type MenuItem = {
  label: string
  href: string
  icon: ({ className }: { className?: string }) => React.ReactNode
  iconActive?: ({ className }: { className?: string }) => React.ReactNode
  isGroupStart?: boolean
  disabled?: boolean
}

const menuItems: MenuItem[] = [
  // Группа 1: Feed
  { label: 'Feed', href: '/feed', icon: Home, iconActive: HomeFill },
  { label: 'Create', href: '/create', icon: PlusSquare, iconActive: PlusSquareFill },
  { label: 'My Profile', href: '/profile', icon: Person, iconActive: PersonFill },
  { label: 'Messenger', href: '/messenger', icon: MessageCircle, iconActive: MessageCircleFill },
  { label: 'Search', href: '/search', icon: Search },
  // Группа 2: Statistics
  { label: 'Statistics', href: '/statistics', icon: TrendingUp, isGroupStart: true },
  { label: 'Favorites', href: '/favorites', icon: Bookmark, iconActive: BookmarkFill },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className={s.sidebar}>
      <NavigationMenu.Root className={s.navRoot}>
        <NavigationMenu.List className={s.navList}>
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href
            const Icon = isActive && item.iconActive ? item.iconActive : item.icon
            const isFirstInGroup = item.isGroupStart && index > 0

            return (
              <NavigationMenu.Item
                key={item.href}
                className={`${s.navItem} ${isFirstInGroup ? s.groupStart : ''}`}
              >
                <NavigationMenu.Link asChild>
                  <Link
                    href={item.href}
                    className={`
    ${s.navLink} 
    ${isActive ? `${s.active} text-bold-sm` : 'text-regular-sm'} 
    ${item.disabled ? s.disabled : ''}
    
`}
                  >
                    {Icon && <Icon className={s.icon} />}
                    <span className={s.label}>{item.label}</span>
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            )
          })}

          <NavigationMenu.Item className={`${s.navItem} ${s.logoutSection}`}>
            <NavigationMenu.Link asChild>
              <Link href="/login" className={s.logoutLink}>
                <LogOut className={s.icon} />
                <span className="text-medium-sm" style={{ color: 'inherit' }}>
                  Log Out
                </span>
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </aside>
  )
}
