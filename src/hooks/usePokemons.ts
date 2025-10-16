import { useQuery } from '@tanstack/react-query';
import { fetchPokemons } from '../api/pokemons';
import type { TPokemon } from '../api/pokemons';

export const useUsers = () => {
  return useQuery<TPokemon[], Error>({
    queryKey: ['users'],
    queryFn: fetchPokemons,
  });
};
