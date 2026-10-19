'use client'

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import s from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'textButton'

type ButtonOwnProps<T extends ElementType> = {
  as?: T
  children?: ReactNode
  className?: string
  variant?: ButtonVariant
}

type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>

export const Button = <T extends ElementType = 'button'>({
  as,
  className,
  variant = 'primary',
  children,
  ...props
}: ButtonProps<T>) => {
  const Component = as || 'button'

  const buttonClass = `${s.button} ${s[variant]} ${className || ''}`.trim()

  return (
    <Component className={buttonClass} {...props}>
      {children}
    </Component>
  )
}
