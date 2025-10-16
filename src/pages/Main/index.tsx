import { memo } from 'react';
import { usePokemons } from '../../hooks/usePokemons';
import type { TPokemon } from '../../api/pokemons';

const Main = () => {
  const { data: pokemons, isError, error } = usePokemons();

  if (isError) return <p>Ошибка: {error.message}</p>;

  return (
    <ul>
      {pokemons?.map((pokemon: TPokemon) => (
        <li key={pokemon.id}>{pokemon.name}</li>
      ))}
    </ul>
  );
};

export default memo(Main);
