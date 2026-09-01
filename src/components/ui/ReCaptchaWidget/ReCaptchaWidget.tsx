'use client'

import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { CheckboxRoot, CheckboxIndicator } from '@/components/ui/CheckBox/primitives/CheckBoxPrimitive'
import { RecaptchaIcon } from '@/components/icons/RecaptchaIcon'
import { RecaptchaCheckIcon } from '@/components/icons/RecaptchaCheckIcon'
import { RecaptchaSpinnerIcon } from '@/components/icons/RecaptchaSpinnerIcon'
import s from './ReCaptchaWidget.module.css'

type Props = {
  siteKey: string
  value: string
  onChange: (token: string) => void
  error?: string
  label?: string
}

export const ReCaptchaWidget = ({ siteKey, value, onChange, error, label = "I'm not a robot" }: Props) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
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

  const handleCheckboxChange = async (newChecked: boolean) => {
    if (!newChecked || !!value || isVerifying) return
    setHasInteracted(true)
    setIsVerifying(true)
    setRecaptchaError(null)

    clearVerifyTimeout()
    verifyTimeoutRef.current = setTimeout(() => {
      setIsVerifying(false)
      setRecaptchaError('Verification failed. Please try again.')
      recaptchaRef.current?.reset()
    }, 10000)

    try {
      const maybePromise = recaptchaRef.current?.executeAsync?.()
      if (maybePromise && typeof (maybePromise as Promise<string | null>).then === 'function') {
        const token = await (maybePromise as Promise<string | null>)
        clearVerifyTimeout()
        if (token) {
          handleChange(token)
        } else {
          setIsVerifying(false)
          setRecaptchaError('Verification failed. Please try again.')
        }
        return
      }
      recaptchaRef.current?.execute()
    } catch {
      clearVerifyTimeout()
      setIsVerifying(false)
      setRecaptchaError('Verification failed. Please try again.')
    }
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
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        size="invisible"
        badge="inline"
        onChange={handleChange}
        onExpired={handleExpired}
        onErrored={handleError}
      />

      <div className={`${s.widget} ${!!validationError  ? s.widgetError : ''}`}>
        <div className={s.widgetMain}>
          {displayRecaptchaError && (
            <p className={`text-regular-sm ${s.errorBadge}`} role="alert">
              {displayRecaptchaError}
            </p>
          )}
          <CheckboxRoot
            className={s.checkbox}
            checked={isVerifying || isDone}
            onValueChange={handleCheckboxChange}
            disabled={isDone}
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
