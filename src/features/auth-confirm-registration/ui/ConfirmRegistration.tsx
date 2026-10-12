'use client'

import { useSearchParams } from 'next/navigation'
import { useConfirmRegistration } from '../api/useConfirmRegistration.mutation'
import { useEffect, useRef } from 'react'
import { EmailVerificationSuccess } from './EmailVerificationSuccess'
import { EmailVerificationExpired } from './EmailVerificationExpired'

export const ConfirmRegistration = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const email = searchParams.get('email')
  const { mutate, isSuccess, isError } = useConfirmRegistration()
  const isCodeSent = useRef(false)

  useEffect(() => {
    if (isCodeSent.current) return
    if (code) {
      isCodeSent.current = true
      mutate({ confirmationCode: code })
    }
  }, [code, mutate])

  if (isSuccess) {
    return <EmailVerificationSuccess />
  }

  if (isError || !code) {
    return <EmailVerificationExpired email={email} />
  }

  return <div>Loading...</div>
}
