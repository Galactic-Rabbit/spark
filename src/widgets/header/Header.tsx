'use client'

import Link from 'next/link'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Button } from '@shared/ui/Button'
import SelectBox from '@shared/ui/Select/Select'
import s from './Header.module.css'
import { Bell } from '@shared/ui/icons'
import { useSession } from '@entities/session'

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Русский' },
]

export const Header = () => {
  const { isAuthorized } = useSession()

  return (
    <header className={s.header}>
      <div className={s.container}>
        {/* Логотип */}
        <Link href="/" className={s.logo}>
          Inctagram
        </Link>

        {/* Правая часть */}
        <div className={s.rightGroup}>
          {isAuthorized ? (
            // --- Авторизованный ---
            <div className={s.bellSelectGroup}>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className={s.notificationButton} aria-label="Notifications">
                  <Bell width={18} height={20} />
                  <span className={s.badge}>1</span>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className={s.dropdownContent} sideOffset={8}>
                    <DropdownMenu.Item className={s.dropdownItem}>
                      Новое уведомление
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              <SelectBox
                options={languageOptions}
                value="en"
                placeholder="English"
                className={s.selectWrapper}
              />
            </div>
          ) : (
            // --- Неавторизованный ---
            <>
              <SelectBox
                options={languageOptions}
                value="en"
                placeholder="English"
                className={s.selectWrapper}
              />
              <div className={s.actions}>
                <Button variant="outline" className={s.loginButton} as={Link} href="/login">
                  Log in
                </Button>

                <Button variant="primary" className={s.signupButton} as={Link} href="/register">
                  Sign up
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
