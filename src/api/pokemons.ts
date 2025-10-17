import { api } from './client';
import type { TPokemon, TPokemons } from './types';

// GET-запрос
export const fetchPokemons = async (): Promise<TPokemons> => {
  const { data } = await api.get<TPokemons>(`/pokemon/?limit=100`);

  return data;
};

// GET одного пользователя по ID
export const fetchPokemonById = async (id: number): Promise<TPokemon> => {
  const { data } = await api.get<TPokemon>(`/pokemon/${id}`);

  return data;
};
