import s from './DropdownMenuCustom.module.css'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ReactNode } from 'react'

type Props = {
  ariaLabel: string
  trigger: ReactNode
  children: ReactNode
}

export const DropdownMenuCustom = ({ ariaLabel, trigger, children }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger aria-label={ariaLabel}>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.dropdownContent} sideOffset={8}>
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
