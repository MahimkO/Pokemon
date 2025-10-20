import { Card } from 'antd';
import { type FC, type ReactNode } from 'react';

type TProps = {
  alt?: string;
  buttons?: ReactNode[];
  content: { key: string; node: string | ReactNode }[];
  draggable?: boolean;
  extra?: ReactNode;
  imgSrc?: string;
  size?: 'default' | 'small';
  title?: string;
  width?: number | string;
  setIsImageLoaded: (value: boolean) => void;
};

export const AntdCard: FC<TProps> = ({
  alt,
  buttons,
  content,
  draggable,
  extra = null,
  imgSrc,
  size = 'default',
  title,
  width = 250,
  setIsImageLoaded,
}) => {
  return (
    <Card
      actions={buttons}
      cover={
        <img
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
          draggable={draggable}
          alt={alt}
          src={imgSrc}
          style={{ width: 250, height: 'auto', margin: '0 auto' }}
        />
      }
      extra={extra}
      size={size}
      style={{ width, minWidth: 250 }}
      styles={{ body: { borderTop: '1px solid rgb(240, 240, 240)' } }}
      title={title}
    >
      {content.map(({ key, node }) =>
        typeof node === 'string' ? <p key={key}>{node}</p> : <div key={key}>{node}</div>
      )}
    </Card>
  );
};
