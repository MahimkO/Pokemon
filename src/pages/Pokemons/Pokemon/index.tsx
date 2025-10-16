import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { usePokemon } from '../../../hooks/usePokemon';
import type { FC } from 'react';

const Pokemon: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: pokemon, isError, error } = usePokemon(+id!);

  if (isError) return <p>Ошибка: {error.message}</p>;

  return (
    <div>
      <p>
        Name:{' '}
        {pokemon?.name && pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </p>
      <p>Height: {pokemon?.height}</p>
      <p>Weight: {pokemon?.weight}</p>
      <p>Exp: {pokemon?.base_experience}</p>
    </div>
  );
};

export default memo(Pokemon);
