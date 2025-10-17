import { ArrowLeftOutlined, ArrowRightOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePokemon } from '../../hooks/usePokemon';
import { AntdCard } from '../AntdCard';

import type { FC } from 'react';

type TProps = {
  id: number;
};

const popoverText = <p>Нажмите, если хотите получить больше информации о покемоне</p>;

const PokemonCard: FC<TProps> = ({ id }) => {
  const { data: pokemon, error, isError } = usePokemon(+id!);
  const navigate = useNavigate();

  if (isError) return <p>Ошибка: {error.message}</p>;

  const goToPreviousPage = () => {
    navigate(`/pokemons/${+id! - 1}`);
  };

  const goToNextPage = () => {
    navigate(`/pokemons/${+id! + 1}`);
  };

  const goToDetailedPage = () => {
    navigate(`/pokemons/${id}/detailed`);
  };

  const buttons = [
    <Button onClick={goToPreviousPage} icon={<ArrowLeftOutlined />}>
      Назад
    </Button>,
    <Button onClick={goToNextPage} icon={<ArrowRightOutlined />}>
      Вперёд
    </Button>,
  ];

  const cardDContent = [`Height: ${pokemon?.height}`, `Weight: ${pokemon?.weight}`, `Exp: ${pokemon?.base_experience}`];

  return (
    <div>
      <AntdCard
        content={cardDContent}
        imgSrc={pokemon?.sprites?.front_default}
        buttons={buttons}
        title={pokemon?.name && pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
        extra={
          <Popover content={popoverText} title="Больше">
            <Button onClick={goToDetailedPage} icon={<EllipsisOutlined />} />
          </Popover>
        }
      />
    </div>
  );
};

export default memo(PokemonCard);
