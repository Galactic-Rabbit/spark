'use client'
import { ComponentProps, useId } from 'react'
import s from './Textarea.module.css'

type TextareaProps = ComponentProps<'textarea'> & {
  label?: string
  error?: boolean
  errorText?: string
  /** Текущая длина текста — для счётчика «набрано/лимит» (показывается вместе с maxLength) */
  valueLength?: number
}

export const Textarea = ({
  label,
  error = false,
  errorText,
  valueLength = 0,
  maxLength,
  id,
  className,
  ...restProps
}: TextareaProps) => {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const errorId = `${textareaId}-error`

  const textareaClassName = [s.textarea, error && s.error, className].filter(Boolean).join(' ')
  const showError = error && !!errorText
  const showCounter = maxLength !== undefined

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
        maxLength={maxLength}
        aria-invalid={error}
        aria-describedby={showError ? errorId : undefined}
        {...restProps}
      />
      {(showError || showCounter) && (
        <div className={s.footer}>
          {showError && (
            <span id={errorId} className={s.errorText}>
              {errorText}
            </span>
          )}
          {showCounter && (
            <span className={s.counter}>
              {valueLength}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
