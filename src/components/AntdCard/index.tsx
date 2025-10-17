import { Card } from 'antd';
import type { FC, ReactNode } from 'react';

type TProps = {
  alt?: string;
  buttons?: ReactNode[];
  content: string[];
  draggable?: boolean;
  extra?: ReactNode;
  imgSrc?: string;
  size?: 'default' | 'small';
  title?: string;
  width?: number | string;
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
}) => {
  return (
    <Card
      actions={buttons}
      cover={
        <img draggable={draggable} alt={alt} src={imgSrc} style={{ borderBottom: '1px solid rgb(240, 240, 240)' }} />
      }
      extra={extra}
      size={size}
      style={{ width }}
      title={title}
    >
      {content.map((item, i) => (
        <p key={item + i}>{item}</p>
      ))}
    </Card>
  );
};
