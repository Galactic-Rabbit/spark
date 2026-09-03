import { useMutation } from '@tanstack/react-query';
import { signUpRequest } from '../api/signUp';

export const useSignUp = () => {
    return useMutation({
        mutationFn: signUpRequest,
    });
};