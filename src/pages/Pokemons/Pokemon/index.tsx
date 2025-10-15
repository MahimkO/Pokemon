import { memo } from 'react';
import { useParams } from 'react-router-dom';

import type { FC } from 'react';

const Pokemon: FC = () => {
  const { id } = useParams<{ id: string }>();

  return <div>pokemon {id}</div>;
};

export default memo(Pokemon);
