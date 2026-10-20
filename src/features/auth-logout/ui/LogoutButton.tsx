'use client'

import { LogOut } from '@shared/ui/icons'
import { useLogoutMutation } from '../api/useLogout.mutation'
import s from './LogoutButton.module.css'

export const LogoutButton = () => {
    const { mutate, isPending } = useLogoutMutation()

    return (
        <button
            type="button"
            className={s.root}
            onClick={() => mutate()}
            disabled={isPending}
        >
            <LogOut className={s.icon} />
            <span className={s.label}>{isPending ? 'Logging out…' : 'Log Out'}</span>
        </button>
    )
}