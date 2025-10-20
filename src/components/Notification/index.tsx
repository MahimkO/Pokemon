import { Button, notification, Space } from 'antd';
import type { FC } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
// type TProps = {
//   type: NotificationType;
// };

const Notification: FC<NotificationType> = (type) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Успех!',
      description: 'ЛАЛАЛА УСПЕХ!!!',
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={() => openNotificationWithIcon(type)}>{type}</Button>
      </Space>
    </>
  );
};

export { Notification };
