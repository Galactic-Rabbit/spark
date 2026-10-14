import {components} from '@shared/api/types';
import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';

type RecoveryData = components['schemas']['NewPasswordInputDto']


export const usePasswordRecoveryMutation = () => {
  return useMutation({
    mutationFn: async ({newPassword, recoveryCode }: RecoveryData) => {
      const { data, error } = await apiClient.POST('/api/v1/auth/new-password', {
        body: {
          newPassword,
          recoveryCode
        },
      })
      if (error) throw error
      return data
    },
  })
}
