import { useQuery } from '@tanstack/react-query';
import { fetchPokemonById } from '../api/pokemons';
import type { TPokemon } from '../api/pokemons';

export const usePokemon = (id: number) => {
  return useQuery<TPokemon, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchPokemonById(id!),
    enabled: !!id, // запрос не запустится, если id нет
  });
};
