'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import s from './IconButton.module.css'

type Props = Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'aria-label'> & {
  children: ReactNode
  'aria-label': string
}

export const IconButton = ({ children, className, type = 'button', ...props }: Props) => {
  return (
    <button type={type} className={`${s.button} ${className ?? ''}`.trim()} {...props}>
      {children}
    </button>
  )
}
