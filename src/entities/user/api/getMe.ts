import { apiClient } from '@/shared/api/client'
import type { components } from '@/shared/api/types'

export type MeViewDto = components['schemas']['MeViewDto']

export const getMe = async () => {
  const { data, error } = await apiClient.GET('/api/v1/auth/me')
  if (error) throw error
  if (!data) throw new Error('Нет данных')
  return data
}
