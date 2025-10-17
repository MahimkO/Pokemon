import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchPokemons } from '../api/pokemons';
import type { TPokemonFull } from '../api/types';

export const usePokemons = (page: number, limit: number) => {
  return useQuery<TPokemonFull, Error>({
    queryKey: ['pokemons', page, limit],
    queryFn: () => fetchPokemons(page, limit),
    placeholderData: keepPreviousData, // сохраняет старую страницу, пока загружается новая
    staleTime: 1000 * 60 * 5, // кэширует на 5 минут
  });
};
