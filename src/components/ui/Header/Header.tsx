'use client';

import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/Button';
import SelectBox from '@/components/ui/Select/Select';
import { OutlineBell } from '@/components/icons/OutlineBell/OutlineBell';
import s from './Header.module.css';

const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Русский' },
];

export const IS_AUTHENTICATED = false; // ← true для авторизованного

export const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                {/* Логотип */}
                <Link href="/" className={s.logo}>
                    Inctagram
                </Link>

                {/* Правая часть */}
                <div className={s.rightGroup}>
                    {IS_AUTHENTICATED ? (
                        // --- Авторизованный ---
                        <div className={s.bellSelectGroup}>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger className={s.notificationButton} aria-label="Notifications">
                                    <OutlineBell />
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
                            <Button variant="outline" className={s.loginButton}>
                                Log in
                            </Button>

                            <Button variant="primary" className={s.signupButton}>
                                Sign up
                            </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};