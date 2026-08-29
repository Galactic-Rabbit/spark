import { ReactNode } from 'react'
import s from './AuthFormWrapper.module.css'

interface AuthFormWrapperProps {
  children: ReactNode
}

export const AuthFormWrapper = ({ children }: AuthFormWrapperProps) => {
  return <div className={s.wrapper}>{children}</div>
}
