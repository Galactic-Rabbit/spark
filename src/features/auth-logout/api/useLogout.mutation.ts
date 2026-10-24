import { authStorage } from '@/shared/api/authStorage'
import { apiClient } from '@/shared/api/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useLogoutMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: async () => {
            const { error } = await apiClient.POST('/api/v1/auth/logout')
            if (error) throw error
        },
        onSettled: async () => {
            // onSettled — чистим локальное состояние В ЛЮБОМ СЛУЧАЕ:
            // если бэк упал, пользователь всё равно должен выйти локально.
            await authStorage.clearTokens()
            queryClient.clear()
            router.replace('/login')
        },
    })
}