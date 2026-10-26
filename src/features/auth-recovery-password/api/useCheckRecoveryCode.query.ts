import { useQuery } from '@tanstack/react-query'
import { createApiError } from '@shared/api/apiError'
import { apiClient } from '@shared/api/client'

export const useCheckRecoveryCodeQuery = (recoveryCode: string | null) =>
  useQuery({
    queryKey: ['check-recovery-code', recoveryCode],
    queryFn: async () => {
      const { data, error, response } = await apiClient.POST(
        '/api/v1/auth/check-recovery-code',
        {
          body: { recoveryCode: recoveryCode ?? '' },
        },
      )

      if (!response.ok) throw createApiError(response.status, error)
      return data
    },
    enabled: !!recoveryCode,
    retry: false,
    staleTime: Infinity,
  })
