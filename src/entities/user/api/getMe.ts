import { apiClient } from '@/shared/api/client'
import type { components } from '@/shared/api/types'
import { createApiError } from '@shared/api/apiError'

export type MeViewDto = components['schemas']['MeViewDto']

export const getMe = async () => {
  const { data, error, response } = await apiClient.GET('/api/v1/auth/me')
  if (!response.ok) throw createApiError(response.status, error)
  if (!data) throw createApiError(response.status, null)
  return data
}
