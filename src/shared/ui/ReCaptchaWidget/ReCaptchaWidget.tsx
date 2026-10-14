'use client'

import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  CheckboxRoot,
  CheckboxIndicator,
} from '@shared/ui/CheckBox/primitives/CheckBoxPrimitive'
import { RecaptchaIcon } from '@shared/ui/icons/RecaptchaIcon'
import { RecaptchaCheckIcon } from '@shared/ui/icons/RecaptchaCheckIcon'
import { RecaptchaSpinnerIcon } from '@shared/ui/icons/RecaptchaSpinnerIcon'
import s from './ReCaptchaWidget.module.css'

type Props = {
  siteKey: string
  value: string
  onChange: (token: string) => void
  error?: string
  label?: string
}

/**
 * Google на execute() даёт 30 секунд (cfg['execute-ms'] в /recaptcha/api.js),
 * а человеку на решение капчи-картинки нужно заметно больше.
 * Таймаут меньше — это сброс виджета прямо во время решения.
 */
const VERIFY_TIMEOUT_MS = 120_000

export const ReCaptchaWidget = ({
  siteKey,
  value,
  onChange,
  error,
  label = "I'm not a robot",
}: Props) => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const verifyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isDone = !!value && !isVerifying && !recaptchaError

  const validationError = error
  const displayRecaptchaError = hasInteracted ? recaptchaError : null

  const clearVerifyTimeout = () => {
    if (verifyTimeoutRef.current) {
      clearTimeout(verifyTimeoutRef.current)
      verifyTimeoutRef.current = null
    }
  }

  useEffect(() => {
    return () => clearVerifyTimeout()
  }, [])

  const handleChange = (token: string | null) => {
    clearVerifyTimeout()
    setIsVerifying(false)
    if (token) {
      onChange(token)
      setRecaptchaError(null)
    } else {
      onChange('')
    }
  }

  const handleExpired = () => {
    clearVerifyTimeout()
    onChange('')
    setIsVerifying(false)
    setRecaptchaError('Verification expired. Please try again.')
  }

  const handleError = () => {
    clearVerifyTimeout()
    onChange('')
    setIsVerifying(false)
    setRecaptchaError('Verification failed. Please try again.')
  }

  /**
   * Клик физически попадает в прозрачный нативный виджет, который лежит поверх
   * нашей вёрстки, поэтому «начало проверки» ловим на самой плашке.
   * Программно дёрнуть нативный чекбокс нельзя: execute() работает только
   * для invisible-ключа, а прокликать чужой iframe из JS невозможно.
   */
  const handlePointerDown = () => {
    if (value || isVerifying) return
    setHasInteracted(true)
    setIsVerifying(true)
    setRecaptchaError(null)
    clearVerifyTimeout()
    verifyTimeoutRef.current = setTimeout(() => {
      setIsVerifying(false)
      setRecaptchaError('Verification failed. Please try again.')
    }, VERIFY_TIMEOUT_MS)
  }

  if (!siteKey) {
    return (
      <div className={`${s.widget} ${s.widgetError}`}>
        <div className={s.widgetMain}>
          <p className={s.errorBadge} role="alert">
            Missing reCAPTCHA site key
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <div className={`${s.widget} ${!!validationError ? s.widgetError : ''}`}>
        <div className={s.widgetMain} onPointerDown={handlePointerDown}>
          {/* Настоящая капча: прозрачная, но кликабельная, лежит поверх нашей вёрстки.
              Стили в .nativeLayer — там же объяснение, почему прячется только анкор. */}
          <div className={s.nativeLayer}>
            <ReCAPTCHA
              sitekey={siteKey}
              theme="dark"
              size="normal"
              onChange={handleChange}
              onExpired={handleExpired}
              onErrored={handleError}
            />
          </div>

          {displayRecaptchaError && (
            <p className={`text-regular-sm ${s.errorBadge}`} role="alert">
              {displayRecaptchaError}
            </p>
          )}
          <CheckboxRoot
            className={s.checkbox}
            checked={isVerifying || isDone}
            disabled={isDone}
            aria-hidden="true"
            tabIndex={-1}
          >
            <CheckboxIndicator>
              {isVerifying ? (
                <span className={s.spin}>
                  <RecaptchaSpinnerIcon className={s.spinner} />
                </span>
              ) : isDone ? (
                <RecaptchaCheckIcon className={s.check} />
              ) : null}
            </CheckboxIndicator>
          </CheckboxRoot>
          <span className={`text-medium-sm ${s.recaptchaLabel}`}>{label}</span>
          <div className={s.iconText}>
            <RecaptchaIcon className={s.logo} />
            <p className={`text-medium-sm ${s.reCaptcha}`}>reCAPTCHA</p>
            <p className={`text-medium-sm ${s.privacy}`}>Privacy - Terms</p>
          </div>
        </div>
        {validationError && (
          <p className={`text-regular-sm ${s.error}`} role="alert">
            {validationError}
          </p>
        )}
      </div>
    </div>
  )
}
