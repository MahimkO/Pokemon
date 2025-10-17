import { api } from './client';
import type { TPokemon, TPokemons } from './types';

// GET-запрос нескольких покемонов (20)
export const fetchPokemons = async (): Promise<TPokemons> => {
  const { data } = await api.get<TPokemons>('/pokemon/?limit=20');

  return data;
};

// GET-запрос одного покемона по ID
export const fetchPokemonById = async (id: number): Promise<TPokemon> => {
  const { data } = await api.get<TPokemon>(`/pokemon/${id}`);

  return data;
};
