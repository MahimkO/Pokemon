import axios from 'axios';

export interface RegisterInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const registerUser = async (data: RegisterInput): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>('http://localhost:3000/auth/register', data);
  return response.data;
};
