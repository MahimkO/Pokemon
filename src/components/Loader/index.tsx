import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import type { FC } from 'react';

type TProps = {
  size?: number;
};

const Loader: FC<TProps> = ({ size = 48 }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(220, 220, 220, 0.3)', // затемнение
      borderRadius: 8,
      zIndex: 1000,
    }}
  >
    <Spin indicator={<LoadingOutlined style={{ fontSize: size, color: '#549ffcff' }} spin />} />
  </div>
);

export default Loader;
