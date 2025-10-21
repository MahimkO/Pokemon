import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

// можно добавить перехватчики (interceptors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error: ', error);
    return Promise.reject(error);
  }
);
