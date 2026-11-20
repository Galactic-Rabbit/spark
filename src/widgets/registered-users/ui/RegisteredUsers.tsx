'use client'
import { ReactNode } from 'react'
import s from './RegisteredUsers.module.css'

type Props = {
  children: ReactNode
}

export const RegisteredUsers = ({ children }: Props) => {
  const digits = typeof children === 'string' ? children.split('') : []
  return (
    <div className={`${s.container} text-h2`}>
      <div>Registered users:</div>
      <div className={s.digitsBox}>
        {digits.map((digit, index) => (
          <span
            key={index}
            className={`${s.digit} ${index !== digits.length - 1 ? s.withDivider : ''}`}
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  )
}
