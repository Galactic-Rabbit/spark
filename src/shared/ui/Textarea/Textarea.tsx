'use client'
import { ComponentProps, useId } from 'react'
import s from './Textarea.module.css'

type TextareaProps = ComponentProps<'textarea'> & {
  label?: string
  error?: boolean
  errorText?: string
}

export const Textarea = ({
  label,
  error = false,
  errorText,
  id,
  className,
  ...restProps
}: TextareaProps) => {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const errorId = `${textareaId}-error`

  const textareaClassName = [s.textarea, error && s.error, className].filter(Boolean).join(' ')

  return (
    <div className={s.field}>
      {label && (
        <label htmlFor={textareaId} className={s.label}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={textareaClassName}
        aria-invalid={error}
        aria-describedby={error && errorText ? errorId : undefined}
        {...restProps}
      />
      {error && errorText && (
        <span id={errorId} className={s.errorText}>
          {errorText}
        </span>
      )}
    </div>
  )
}
