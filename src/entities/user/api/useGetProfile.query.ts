import { useQuery } from '@tanstack/react-query'
import { getProfile } from './getProfile'

export const useGetProfile = (userId?: string) => {
  return useQuery({
    queryKey: ['user', 'profile', userId],
    queryFn: () => getProfile(userId),
    staleTime: 5 * 60 * 1000,
  })
}
