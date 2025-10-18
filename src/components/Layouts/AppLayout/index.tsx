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
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Dropdown, Input, Layout, Menu, Modal, Space, theme } from 'antd';
import type { FC, JSX, ReactNode } from 'react';
import { createElement, useState } from 'react';
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../../routes';

type TProps = {
  children: ReactNode;
};

const { Content, Footer, Header, Sider } = Layout;

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
  const navigate = useNavigate();
  const location = useLocation();

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

  // Menu элементы
  const navBarItems: MenuProps['items'] = [
    {
      key: '/',
      label: 'Главная',
      onClick: () => navigate('/'),
    },
    {
      key: '/pokemons',
      label: 'Покемоны',
      onClick: () => navigate('/pokemons'),
    },
    {
      key: '/about',
      label: 'О проекте',
      onClick: () => navigate('/about'),
    },
  ];

  // matchRoutes возвращает массив совпавших маршрутов
  const matches = matchRoutes(routes, location);

  const breadcrumbItems = [
    // "Главная" всегда первой
    {
      title:
        location.pathname === '/' ? (
          <HomeOutlined />
        ) : (
          <Link to="/">
            <HomeOutlined />
          </Link>
        ),
    },
    // остальные крошки из matchRoutes
    ...(matches
      ? matches
          .map((match, index) => {
            const route = match.route;

            if (!route.breadcrumb) return null; // возвращаем null для фильтрации

            const isLast = index === matches.length - 1;
            const title: string | JSX.Element = isLast ? (
              route.breadcrumb
            ) : (
              <Link to={match.pathname}>{route.breadcrumb}</Link>
            );

            return { title };
          })
          .filter((item): item is { title: string | JSX.Element } => item !== null)
      : []),
  ];

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
          <img src="/images/pokemon.png" width="95" style={{ marginRight: '15px' }} />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
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
            <Breadcrumb separator=">" items={breadcrumbItems} style={{ margin: '16px 0' }} />
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
