import { useQuery } from '@tanstack/react-query'
import { getMe } from './getMe'

export const useGetMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
  })
}
