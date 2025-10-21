import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from '../Card';

import type { FC, ReactNode } from 'react';
import type { TPokemon } from '../../api/types';

type TProps = { pokemon: TPokemon; buttons?: ReactNode[] };

const popoverText = <p>Нажмите, если хотите получить больше информации о покемоне</p>;

const PokemonCard: FC<TProps> = ({ pokemon, buttons }) => {
  const navigate = useNavigate();

  const goToDetailedPage = () => {
    navigate(`/pokemons/${pokemon.id}`);
  };

  const content = [
    { key: 'height', node: `Height: ${pokemon?.height}` },
    { key: 'weight', node: `Weight: ${pokemon?.weight}` },
    { key: 'exp', node: `Exp: ${pokemon?.base_experience}` },
  ];

  return (
    <Card
      content={content}
      imgSrc={pokemon?.sprites?.front_default}
      buttons={buttons}
      title={pokemon?.name && pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      extra={
        <Popover content={popoverText} title="Больше">
          <Button onClick={goToDetailedPage} icon={<EllipsisOutlined />} />
        </Popover>
      }
    />
  );
};

export default memo(PokemonCard);
