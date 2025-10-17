import axios from 'axios';
import { api } from './client';
import type { TPokemon, TPokemonFull, TPokemonShortInfo } from './types';

// GET-запрос нескольких покемонов (по умолчанию 10)
export const fetchPokemons = async (page: number, limit: number = 10): Promise<TPokemonFull> => {
  const offset = (page - 1) * limit;

  // Список покемонов (имя + url)
  const listRes = await api.get<{ count: number; results: TPokemonShortInfo[] }>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );

  // Подробные данные для каждого покемона
  const details = await Promise.all(
    listRes.data.results.map(async (item) => {
      const res = await axios.get<TPokemon>(item.url);
      return res.data;
    })
  );

  return { count: listRes.data.count, details };
};

// GET-запрос одного покемона по ID
export const fetchPokemonById = async (id: number): Promise<TPokemon> => {
  const { data } = await api.get<TPokemon>(`/pokemon/${id}`);

  return data;
};
