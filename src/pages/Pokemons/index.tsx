import { Pagination } from 'antd';
import { memo, useState, type FC } from 'react';

import Loader from '../../components/Loader';
import PokemonCard from '../../components/PokemonCard';
import { usePokemons } from '../../hooks/usePokemons';

const Pokemons: FC = () => {
  const [page, setPage] = useState(1);
  const limit = 6;
  const { data, isLoading } = usePokemons(page, limit);
  const { count, details } = data ?? { count: 0, details: [] };

  return isLoading ? (
    <Loader />
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {details.length && details.map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
      </div>

      <Pagination
        current={page}
        pageSize={limit}
        total={count} // общее число покемонов
        onChange={(newPage) => setPage(newPage)}
        showSizeChanger={false} // чтобы нельзя было менять количество отображаемых элементов
        style={{ alignSelf: 'center', marginTop: 20 }}
      />
    </div>
  );
};

export default memo(Pokemons);
