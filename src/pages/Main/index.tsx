import { memo } from 'react';
import { useUsers } from '../../hooks/useUsers';
import type { TUser } from '../../api/pokemons';

const Main = () => {
  const { data, isError, error } = useUsers();

  if (isError) return <p>Ошибка: {error.message}</p>;

  return (
    <ul>
      {data?.map((user: TUser) => (
        <li key={user.id}>
          {user.name} {user.email && `(${user.email})`}
        </li>
      ))}
    </ul>
  );
};

export default memo(Main);
