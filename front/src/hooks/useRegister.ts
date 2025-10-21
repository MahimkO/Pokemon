import { useMutation } from '@tanstack/react-query';
import { backendApi } from '../api/backend';

export interface RegisterInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const useRegister = () => {
  const mutation = useMutation<AuthResponse, any, RegisterInput>({
    mutationFn: async (data: RegisterInput) => {
      const response = await backendApi.post<AuthResponse>('/auth/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      // Сохраняем токены в localStorage (можно заменить на Context / Zustand / Redux)
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    },
    onError: (error: any) => {
      console.error('Registration failed:', error.response?.data || error.message);
    },
  });

  return mutation;
};
