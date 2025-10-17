import { memo } from 'react';
import { usePokemons } from '../../hooks/usePokemons';
import type { TPokemonShortInfo } from '../../api/pokemons';

const Main = () => {
  const { data: pokemons, isLoading, isError, error } = usePokemons();

  if (isLoading) return <p>Загрузка ...</p>;
  if (isError) return <p>Ошибка: {error.message}</p>;

  return (
    <ul>
      {pokemons?.results?.map((pokemon: TPokemonShortInfo) => (
        <li key={pokemon.name}>
          {pokemon.name} - {pokemon.url}
        </li>
      ))}
    </ul>
  );
};

export default memo(Main);
