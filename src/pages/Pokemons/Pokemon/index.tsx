import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Divider, Popover } from 'antd';
import { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AntdCard } from '../../../components/AntdCard';
import { usePokemon } from '../../../hooks/usePokemon';

import type { FC } from 'react';

const popoverText = <p>Нажмите, если хотите вернуться на страницу с покемонами</p>;

const Pokemon: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: pokemon, error, isError } = usePokemon(+id!);
  const navigate = useNavigate();

  if (isError) return <p>Ошибка: {error.message}</p>;

  const goToPreviousPage = () => {
    navigate(`/pokemons/${+id! - 1}`);
  };

  const goToNextPage = () => {
    navigate(`/pokemons/${+id! + 1}`);
  };

  const goToPokemonsPage = () => {
    navigate('/pokemons');
  };

  const buttons = [
    <Button onClick={goToPreviousPage} icon={<ArrowLeftOutlined />}>
      Назад
    </Button>,
    <Button onClick={goToNextPage} icon={<ArrowRightOutlined />} iconPosition={'end'}>
      Вперёд
    </Button>,
  ];

  const content = [
    { key: 'height', node: `Height: ${pokemon?.height}` },
    { key: 'weight', node: `Weight: ${pokemon?.weight}` },
    { key: 'exp', node: `Exp: ${pokemon?.base_experience}` },
    { key: 'divider1', node: <Divider /> },
    { key: 'hp', node: `HP: ${pokemon?.stats[0].base_stat}` },
    { key: 'attack', node: `Attack: ${pokemon?.stats[1].base_stat}` },
    { key: 'defense', node: `Defense: ${pokemon?.stats[2].base_stat}` },
    { key: 'specialAttack', node: `Special attack: ${pokemon?.stats[3].base_stat}` },
    { key: 'specialDefense', node: `Special defense: ${pokemon?.stats[4].base_stat}` },
    { key: 'speed', node: `Speed: ${pokemon?.stats[5].base_stat}` },
  ];

  return (
    <div>
      <AntdCard
        content={content}
        imgSrc={pokemon?.sprites?.front_default}
        buttons={buttons}
        title={pokemon?.name && pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
        width={'100%'}
        extra={
          <Popover content={popoverText} title="Назад">
            <Button onClick={goToPokemonsPage} icon={<ArrowLeftOutlined />} />
          </Popover>
        }
      />
    </div>
  );
};

export default memo(Pokemon);
