'use client'

import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  CheckboxRoot,
  CheckboxIndicator,
} from '@shared/ui/CheckBox/primitives/CheckBoxPrimitive'
import { RecaptchaIcon } from '@shared/ui/icons/RecaptchaIcon'
import { RecaptchaCheckIcon } from '@shared/ui/icons/RecaptchaCheckIcon'
import { RecaptchaSpinnerIcon } from '@shared/ui/icons/RecaptchaSpinnerIcon'
import s from './ReCaptchaWidget.module.css'
export type ReCaptchaWidgetHandle = { reset: () => void }
type Props = {
  siteKey: string
  value: string
  onChange: (token: string) => void
  error?: string
  label?: string
  ref?: Ref<ReCaptchaWidgetHandle>
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
  ref
}: Props) => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const verifyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nativeLayerRef = useRef<HTMLDivElement>(null)

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

    window.focus()
  }

  const handleError = () => {
    clearVerifyTimeout()
    onChange('')
    setIsVerifying(false)
    setRecaptchaError('Verification failed. Please try again.')
    window.focus()
  }
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  useImperativeHandle(ref, () => ({
    reset: () => {
      recaptchaRef.current?.reset() // сброс галочки внутри iframe Google
      clearVerifyTimeout()
      setIsVerifying(false)
      setRecaptchaError(null)
    },
  }))


  /**
   * «Начало проверки» ловим не кликом по плашке, а уходом фокуса в iframe капчи:
   * клик по прозрачному нативному виджету физически попадает в кросс-origin iframe,
   * и его события не всплывают до нашей вёрстки — onPointerDown на плашке мёртв.
   * В момент клика окно теряет фокус, а document.activeElement становится этим iframe
   * (см. blur-listener ниже). Программно дёрнуть нативный чекбокс нельзя:
   * execute() работает только для invisible-ключа, прокликать чужой iframe из JS нельзя.
   */
  const handlePointerDown = useCallback(() => {
    if (value || isVerifying) return
    setHasInteracted(true)
    setIsVerifying(true)
    setRecaptchaError(null)
    clearVerifyTimeout()
    verifyTimeoutRef.current = setTimeout(() => {
      setIsVerifying(false)
      setRecaptchaError('Verification failed. Please try again.')
      // без возврата фокуса на страницу повторный клик по капче не даст blur
      window.focus()
    }, VERIFY_TIMEOUT_MS)
  }, [value, isVerifying])

  useEffect(() => {
    const handleWindowBlur = () => {
      // фокус ушёл в iframe капчи — значит, кликнули по ней
      const active = document.activeElement
      if (active?.tagName === 'IFRAME' && nativeLayerRef.current?.contains(active)) {
        handlePointerDown()
      }
    }
    window.addEventListener('blur', handleWindowBlur)
    return () => window.removeEventListener('blur', handleWindowBlur)
  }, [handlePointerDown])

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
        <div className={s.widgetMain}>
          {/* Настоящая капча: прозрачная, но кликабельная, лежит поверх нашей вёрстки.
              Стили в .nativeLayer — там же объяснение, почему прячется только анкор.
              ref нужен blur-listener'у, чтобы отличить клик по капче от любого
              другого ухода фокуса со страницы. */}
          <div className={s.nativeLayer} ref={nativeLayerRef}>
            <ReCAPTCHA
              ref={recaptchaRef}
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
