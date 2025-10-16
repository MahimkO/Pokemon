import { api } from './client';

export type TPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
};

// GET-запрос
export const fetchPokemons = async (): Promise<TPokemon[]> => {
  const { data } = await api.get<TPokemon[]>('/pokemons');

  return data;
};

// GET одного пользователя по ID
export const fetchPokemonById = async (id: number): Promise<TPokemon> => {
  const { data } = await api.get<TPokemon>(`/pokemon/${id}`);

  return data;
};
