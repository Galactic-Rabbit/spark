import { useGetMe } from '@entities/user'

export type SessionStatus = 'loading' | 'authorized' | 'guest'

export const useSession = () => {
  const { data, isPending, isError } = useGetMe()

  let status: SessionStatus = 'authorized'
  if (isPending) status = 'loading'
  else if (isError) status = 'guest'

  return {
    status,
    isAuthorized: status === 'authorized',
    user: data ?? null,
  }
}
