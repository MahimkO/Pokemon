import axios from 'axios';

export const backendApi = axios.create({
  baseURL: 'http://localhost:3000', // Nest.js сервер
  headers: {
    'Content-Type': 'application/json',
  },
});

// перехватчики для ошибок
backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Backend API Error: ', error);
    return Promise.reject(error);
  }
);
