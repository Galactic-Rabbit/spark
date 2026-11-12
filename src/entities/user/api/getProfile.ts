import { apiClient } from '@/shared/api/client'
import { createApiError } from '@shared/api/apiError'
import type { components } from '@/shared/api/types'

export type ProfileViewModel = components['schemas']['ProfileViewModel']
export type PublicProfileViewModel = components['schemas']['PublicProfileViewModel']

export const getProfile = async (userId?: string) => {
  // Если userId нет — свой профиль
  if (!userId) {
    const { data, error, response } = await apiClient.GET('/api/v1/users/profile')
    if (!response.ok) throw createApiError(response.status, error)
    if (!data) throw createApiError(response.status, null)
    return data as ProfileViewModel
  }

  // Иначе — чужой профиль
  const { data, error, response } = await apiClient.GET('/api/v1/public-user/profile/{profileId}', {
    params: {
      path: { profileId: Number(userId) },
    },
  })
  if (!response.ok) throw createApiError(response.status, error)
  if (!data) throw createApiError(response.status, null)
  return data as PublicProfileViewModel
}
