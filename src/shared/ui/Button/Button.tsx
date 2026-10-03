'use client'
import React from 'react'
import s from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'textButton'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export const Button = ({ className, variant = 'primary', children, ...props }: ButtonProps) => {
  const buttonClass = `${s.button} ${s[variant]} ${className || ''}`.trim()

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  )
}
