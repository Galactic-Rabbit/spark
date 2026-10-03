// import { apiClient } from '@/shared/api/client'
import type { User } from '../model/types'

export const userApi = {
  //   getMe: async (): Promise<User> => {
  //     const { data, error } = await apiClient.GET('/api/users/me')
  //     if (error) throw error
  //     return data as User
  //   },
  getMe: async (): Promise<User> => {
    throw new Error('not implemented yet')
  },
}
