import { memo, type FC } from 'react';

import PokemonCard from '../../components/PokemonCard';
import { usePokemons } from '../../hooks/usePokemons';

const Pokemons: FC = () => {
  const { data } = usePokemons();

  console.log(data);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {data &&
        data.results.map((pokemon) => {
          console.log(+pokemon.url.split('/').reverse()[1]);
          return <PokemonCard key={pokemon.url} id={+pokemon.url.split('/').reverse()[1]} />;
        })}
    </div>
  );
};

export default memo(Pokemons);
