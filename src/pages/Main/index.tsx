import { memo } from 'react';

import type { TPokemonShortInfo } from '../../api/pokemons';
import { usePokemons } from '../../hooks/usePokemons';

const Main = () => {
  const { data: pokemons, error, isError, isLoading } = usePokemons();

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
