'use client'

import Link from 'next/link'

import { Button } from '@shared/ui/Button'
import SelectBox from '@shared/ui/Select/Select'
import s from './Header.module.css'
import { useSession } from '@entities/session'
import { NotificationBadge } from '@entities/notification'
import { DropdownMenuCustom, DropdownMenuItem } from '@shared/ui/DropdownMenuCustom'

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
              <DropdownMenuCustom ariaLabel="notifications" trigger={<NotificationBadge />}>
                <DropdownMenuItem>Уведомление 1</DropdownMenuItem>
                <DropdownMenuItem>Уведомление 2</DropdownMenuItem>
                <DropdownMenuItem>Уведомление 3</DropdownMenuItem>
                <DropdownMenuItem>Уведомление 4</DropdownMenuItem>
                <DropdownMenuItem>Уведомление 5</DropdownMenuItem>
                <DropdownMenuItem>Уведомление 6</DropdownMenuItem>
              </DropdownMenuCustom>
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
