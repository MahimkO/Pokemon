import { Modal as AntdModal, Form, Input, message } from 'antd';
import type { FC } from 'react';
import { useRegister } from '../../hooks/useRegister';

type TProps = {
  title: string;
  isOpen: boolean;
  handleOk?: () => void;
  confirmLoading?: boolean;
  handleCancel?: () => void;
  okText?: string;
  cancelText?: string;
};

const Modal: FC<TProps> = ({
  title = 'Модальное окно',
  cancelText = 'Отмена',
  okText = 'Ок',
  isOpen,
  handleOk,
  confirmLoading,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const registerMutation = useRegister();

  const onFinish = (values: any) => {
    const { email, password } = values;
    registerMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          message.success('Регистрация прошла успешно!');
          form.resetFields();
          handleOk && handleOk(); // закрываем модалку
        },
        onError: (err: any) => {
          message.error(err.response?.data?.message || 'Ошибка регистрации');
        },
      }
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Validation Failed:', errorInfo);
    message.error('Submit failed!');
  };

  return (
    <AntdModal
      title={title}
      open={isOpen}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelText={cancelText}
      okText={okText}
    >
      <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item
          name="email"
          label="E-Mail"
          rules={[
            { required: true, message: 'Email обязателен' },
            { type: 'email', message: 'Введите корректный email', warningOnly: true },
          ]}
        >
          <Input placeholder="Введите свою почту" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            { required: true, message: 'Пароль обязателен' },
            { min: 5, message: 'Пароль должен быть минимум 5 символов' },
          ]}
          hasFeedback // Показывает иконку проверки / ошибки рядом с полем
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Повторите пароль"
          dependencies={['password']} // Указывает, что поле confirmPassword зависит от password
          hasFeedback
          rules={[
            { required: true, message: 'Повторите пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </AntdModal>
  );
};

export { Modal };
