import { apiRequest } from '@/lib/api';

export type RegistrationDto = {
    userName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

export const signUpRequest = (data: RegistrationDto): Promise<void> => {
    return apiRequest('/api/auth/registration', {
        method: 'POST',
        body: data,
    });
};