import { authStorage } from '@/shared/api/authStorage'
import { useEffect, useState } from 'react'

export const useSession = () => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    authStorage.getAccessToken().then(setToken)
  }, [])

  return {
    token,
    isAuthenticated: Boolean(token),
  }
}
