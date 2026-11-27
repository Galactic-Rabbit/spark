import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  followUserFn,
  unfollowUserFn,
} from '@features/follow-unfollow-user/api/follow-unfollow-user.mutation'

const invalidateFollowQueries = (queryClient: QueryClient, selectedUserId: number) => {
  queryClient.invalidateQueries({ queryKey: ['users', selectedUserId] })
  queryClient.invalidateQueries({ queryKey: ['users', 'following'] })
  queryClient.invalidateQueries({ queryKey: ['users', selectedUserId, 'followers'] })
  queryClient.invalidateQueries({ queryKey: ['user', 'profile', String(selectedUserId)] })
}

export const useFollowUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: followUserFn,
    onSuccess: (_, selectedUserId) => invalidateFollowQueries(queryClient, selectedUserId),
  })
}

export const useUnfollowUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: unfollowUserFn,
    onSuccess: (_, selectedUserId) => invalidateFollowQueries(queryClient, selectedUserId),
  })
}
