export type ApiError = {
    code: string;
    message: string;
    details?: Array<{
        field: string;
        message: string;
    }>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: unknown;
    headers?: Record<string, string>;
};

export const apiRequest = async <T = void>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> => {
    const { method = 'GET', body, headers = {} } = options;

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || 'Произошла ошибка');
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
};