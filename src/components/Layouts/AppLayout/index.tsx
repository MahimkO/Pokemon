import {
  DownOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  HomeOutlined,
  LaptopOutlined,
  LoginOutlined,
  LogoutOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Dropdown, Input, Layout, Menu, Modal, Space, theme } from 'antd';
import type { MenuProps } from 'antd';
import { createElement, useState } from 'react';
import type { FC, ReactNode } from 'react';

type TProps = {
  children: ReactNode;
};

const { Content, Footer, Header, Sider } = Layout;

// NavBar элементы в виде массива объектов {key: string; label: string}
const navBarItems: MenuProps['items'] = [
  {
    key: 1,
    label: 'Главная',
  },
  {
    key: 2,
    label: 'Покемоны',
  },
  {
    key: 3,
    label: 'О проекте',
  },
];

// Sider элементы
const siderItems: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);

  return {
    children: Array.from({ length: 4 }).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
    icon: createElement(icon),
    key: `sub${key}`,
    label: `subnav ${key}`,
  };
});

// Profile элементы
const items: MenuProps['items'] = [
  {
    extra: '⌘P',
    icon: <UserOutlined />,
    key: '1',
    label: 'Профиль',
  },
  {
    extra: '⌘S',
    icon: <SettingOutlined />,
    key: '2',
    label: 'Настройки',
  },
  {
    type: 'divider',
  },
  {
    extra: '⌘E',
    icon: <LogoutOutlined />,
    key: '3',
    label: 'Выйти',
    onClick: () => console.log('Вы успешно вышли'),
  },
];

export const AppLayout: FC<TProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken();

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      if (username.toLowerCase() === 'admin' && password === 'admin') {
        console.log('Hello, admin!');
        setIsAuth(true);
        setIsOpen(false);
        setConfirmLoading(false);
      } else {
        // TODO Добавить выплывающее уведомление или добавить валидацию,
        //  что авторизация не пройдена
        console.log('Авторизация не пройдена');
        setConfirmLoading(false);
      }
    }, 2000);
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setIsOpen(false);
  };

  return (
    <>
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header
          style={{
            alignItems: 'center',
            backgroundColor: '#b0bfdaff',
            display: 'flex',
          }}
        >
          <img src="./pokemon.png" height="95" style={{ marginRight: '15px' }} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={navBarItems}
            style={{ backgroundColor: '#b0bddaff', flex: 1, minWidth: 0 }}
          />
          {isAuth ? (
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {username}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <Button type="primary" onClick={showModal} icon={<LoginOutlined />}>
              Войти
            </Button>
          )}
        </Header>

        <Layout style={{ flex: 1, padding: '0 48px' }}>
          <div style={{ width: '100%' }}>
            <Breadcrumb
              separator=">"
              items={[{ title: <HomeOutlined /> }, { title: <a href="">Pokemons</a> }, { title: 'Pokemon' }]}
              style={{ margin: '16px 0' }}
            />
          </div>

          <Layout
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flex: 1,
              padding: '24px 0',
            }}
          >
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={siderItems}
              />
            </Sider>

            <Content
              style={{
                //   background: '#fff',
                borderRadius: borderRadiusLG,
                flex: 1,
                overflow: 'auto',
                padding: '24px',
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>

        <Footer
          style={{
            padding: '12px 0',
            textAlign: 'center',
          }}
        >
          Maxim Makhovsky ©{new Date().getFullYear()}
        </Footer>
      </Layout>

      <Modal
        title="Авторизация"
        open={isOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="Отмена"
        okText="Авторизоваться"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <p>Заполните поля ниже, чтобы авторизоваться</p>
          <Input
            placeholder="Введите имя пользователя"
            status={username.length > 3 ? '' : 'error'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input.Password
            placeholder="Введите пароль"
            status={password.length > 4 ? '' : 'error'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onPressEnter={() => console.log('Pressed ENTER')}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            style={{ margin: '12px 0' }}
          />
        </Space>
      </Modal>
    </>
  );
};
