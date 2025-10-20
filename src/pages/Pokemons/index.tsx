import { Pagination } from 'antd';
import { memo, useState, type FC } from 'react';

import Loader from '../../components/Loader';
import PokemonCard from '../../components/PokemonCard';
import { usePokemons } from '../../hooks/usePokemons';

const limit = 6;

const Pokemons: FC = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading } = usePokemons(page, limit);
  const { count, details } = data ?? { count: 0, details: [] };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        minHeight: '100%',
      }}
    >
      {(isLoading || isFetching) && <Loader />}

      {!isLoading && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {details.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>

          <Pagination
            current={page}
            pageSize={limit}
            total={count}
            onChange={(newPage) => setPage(newPage)}
            showSizeChanger={false}
            style={{ alignSelf: 'center', marginTop: 20 }}
          />
        </>
      )}
    </div>
  );
};

export default memo(Pokemons);
