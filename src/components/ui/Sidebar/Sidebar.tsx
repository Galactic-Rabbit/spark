'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import s from './Sidebar.module.css'

import { FeedIcon } from '@/components/icons/FeedIcon/FeedIcon'
import { CreateIcon } from '@/components/icons/CreateIcon/CreateIcon'
import { ProfileIcon } from '@/components/icons/ProfileIcon/ProfileIcon'
import { MessengerIcon } from '@/components/icons/MessengerIcon/MessengerIcon'
import { SearchIcon } from '@/components/icons/SearchIcon/SearchIcon'
import { StatisticsIcon } from '@/components/icons/StatisticsIcon/StatisticIcon'
import { FavoritesIcon } from '@/components/icons/FavoritesIcon/FavoritesIcon'
import { LogOutIcon } from '@/components/icons/LogOutIcon/LogOutIcon'
import { FeedIconSolid } from '@/components/icons/FeedIconSolid/FeedIconSolid'
import { CreateIconSolid } from '@/components/icons/CreateIconSolid/CreateIconSolid'
import { ProfileIconSolid } from '@/components/icons/ProfileIconSolid/ProfileIconSolid'
import { FavoritesIconSolid } from '@/components/icons/FavoritesIconSolid/FavoritesIconSolid'

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
  { label: 'Feed', href: '/feed', icon: FeedIcon, iconActive: FeedIconSolid },
  { label: 'Create', href: '/create', icon: CreateIcon, iconActive: CreateIconSolid },
  { label: 'My Profile', href: '/profile', icon: ProfileIcon, iconActive: ProfileIconSolid },
  { label: 'Messenger', href: '/messenger', icon: MessengerIcon },
  { label: 'Search', href: '/search', icon: SearchIcon },
  // Группа 2: Statistics
  { label: 'Statistics', href: '/statistics', icon: StatisticsIcon, isGroupStart: true },
  { label: 'Favorites', href: '/favorites', icon: FavoritesIcon, iconActive: FavoritesIconSolid },
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
                <LogOutIcon className={s.icon} />
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
