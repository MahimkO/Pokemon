import { useQuery } from '@tanstack/react-query';
import { fetchPokemons } from '../api/pokemons';
import type { TPokemons } from '../api/pokemons';

export const usePokemons = () => {
  return useQuery<TPokemons, Error>({
    queryKey: ['pokemons'],
    queryFn: fetchPokemons,
  });
};
