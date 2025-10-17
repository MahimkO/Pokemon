import { useQuery } from '@tanstack/react-query';

import { fetchPokemons } from '../api/pokemons';
import type { TPokemons } from '../api/types';

export const usePokemons = () => {
  return useQuery<TPokemons, Error>({
    queryFn: fetchPokemons,
    queryKey: ['pokemons'],
  });
};
