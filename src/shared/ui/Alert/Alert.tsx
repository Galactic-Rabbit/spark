'use client'

import React from 'react'
import s from './Alert.module.css'
import { Close } from '@/assets/icons'

type AlertType = {
  variant: 'error' | 'success'
  text: string
  onClose?: () => void
}

const Alert = ({ variant, text, onClose }: AlertType) => {
  return (
    <div className={`${s.alert} ${s[variant]}`}>
      <div className={s.message}>
        {variant === 'error' && <strong className={s.errorTitle}>Error!</strong>}
        {text}
      </div>
      <button className={s.closeButton} type="button" onClick={onClose} aria-label="Close alert">
        <Close />
      </button>
    </div>
  )
}

export default Alert
