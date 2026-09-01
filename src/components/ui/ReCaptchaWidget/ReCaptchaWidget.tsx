'use client'

import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useFormContext } from 'react-hook-form'
import { CheckboxRoot, CheckboxIndicator } from '@/components/ui/CheckBox/primitives/CheckBoxPrimitive'
import { RecaptchaIcon } from '@/components/icons/RecaptchaIcon'
import { RecaptchaCheckIcon } from '@/components/icons/RecaptchaCheckIcon'
import { RecaptchaSpinnerIcon } from '@/components/icons/RecaptchaSpinnerIcon'
import s from './ReCaptchaWidget.module.css'

type Props = {
  siteKey: string
  name?: string
  label?: string
}

export const ReCaptchaWidget = ({
  siteKey,
  name = 'recaptchaToken',
  label = "I'm not a robot",
}: Props) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const {
    setValue,
    clearErrors,
    formState: { errors, isSubmitted, touchedFields },
  } = useFormContext()
  const [checked, setChecked] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [expired, setExpired] = useState(false)
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null)

  const isDone = checked && !expired && !isVerifying

  const formError = errors[name]?.message as string | undefined
  // Валидационная ошибка схемы ("Please verify...") — только после сабмита/тача, рендерится внизу widget
  const shouldShowFormError = !!formError && (!!isSubmitted || !!touchedFields[name])
  const validationError = shouldShowFormError ? formError : undefined
  // Сервер/badge ошибка (onErrored/onExpired) — рендерится между widgetMain и CheckboxRoot
  const hasAnyError = !!validationError || !!recaptchaError

  const handleChange = (token: string | null) => {
    setIsVerifying(false)
    if (token) {
      setValue(name, token)
      clearErrors(name)
      setRecaptchaError(null)
      setChecked(true)
      setExpired(false)
    } else {
      setValue(name, null)
      setChecked(false)
    }
  }

  const handleExpired = () => {
    setValue(name, null)
    setChecked(false)
    setIsVerifying(false)
    setExpired(true)
    setRecaptchaError('Verification expired. Please try again.')
  }

  const handleError = () => {
    setValue(name, null)
    setChecked(false)
    setIsVerifying(false)
    setRecaptchaError('Verification failed. Please try again.')
  }

  const handleCheckboxChange = (newChecked: boolean) => {
    if (!newChecked || checked || expired || isVerifying) return
    setIsVerifying(true)
    setRecaptchaError(null)
    clearErrors(name)
    try {
      recaptchaRef.current?.execute()
    } catch {
      setIsVerifying(false)
      setRecaptchaError('Verification failed. Please try again.')
    }
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

      <div className={`${s.widget} ${hasAnyError ? s.widgetError : ''}`}>
        <div className={s.widgetMain}>
          {recaptchaError && (
            <p className={s.errorBadge} role="alert">
              {recaptchaError}
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
          <p className={s.error} role="alert">
            {validationError}
          </p>
        )}
      </div>
    </div>
  )
}
