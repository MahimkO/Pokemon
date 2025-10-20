import {
  BulbOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  HomeOutlined,
  InfoCircleOutlined,
  LaptopOutlined,
  LoginOutlined,
  LogoutOutlined,
  QuestionOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Dropdown, Input, Layout, Menu, Modal, Space, theme } from 'antd';
import type { FC, JSX, ReactNode } from 'react';
import { createElement, useEffect, useState } from 'react';
import { Link, matchPath, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../../routes';

type MenuItem = Required<MenuProps>['items'][number];
type TProps = {
  children: ReactNode;
};

const { Content, Footer, Header, Sider } = Layout;

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
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const randomPokemonID = Math.floor(Math.random() * 1025);

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

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    // чтобы меню можно было сворачивать при клике
    setOpenKeys(keys);
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
      key: '/pokemons/:id',
      label: 'Покемон',
    },
    {
      key: '/about',
      label: 'О проекте',
      onClick: () => navigate('/about'),
    },
  ];

  // Sider элементы
  const siderItems: MenuProps['items'] = [
    {
      icon: createElement(BulbOutlined),
      key: '/news',
      label: 'Новости',
      children: [
        {
          icon: createElement(LaptopOutlined),
          key: '/news-1',
          label: `${new Date().toLocaleDateString()}`,
        },
      ],
    },
    {
      icon: createElement(QuestionOutlined),
      key: '/pokemons/:id',
      label: 'Случайный покемон',
      onClick: () => navigate(`/pokemons/${randomPokemonID}`),
    },
    {
      icon: createElement(InfoCircleOutlined),
      key: '/info',
      label: 'Информация',
      children: [
        {
          icon: createElement(LaptopOutlined),
          key: '/technologies',
          label: 'Технологии',
          onClick: () => navigate('/technologies'),
        },
      ],
    },
  ];

  // Для подсветки пункта подменю в меню боковой панели ("Информация" -> "Технологии")
  const findParentKey = (items: MenuItem[] | undefined, key: string): string | null => {
    if (!items) return null;

    for (const item of items) {
      if (!item) continue; // защищаемся от null / undefined

      if ('children' in item && item.children) {
        if (item.children.some((child) => child && child.key === key)) {
          return item.key as string;
        }
      }
    }

    return null;
  };

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

  useEffect(() => {
    const parentKey = findParentKey(siderItems, location.pathname);
    if (parentKey) setOpenKeys([parentKey]);
  }, [location.pathname]);

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
            items={navBarItems}
            mode="horizontal"
            selectedKeys={[matchPath('/pokemons/:id', location.pathname) ? '/pokemons/:id' : location.pathname]}
            style={{ backgroundColor: '#b0bddaff', flex: 1, minWidth: 0 }}
            theme="dark"
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
            <Sider style={{ background: colorBgContainer }} width={230}>
              <Menu
                items={siderItems}
                mode="inline"
                onOpenChange={handleOpenChange}
                openKeys={openKeys}
                selectedKeys={[location.pathname]}
                style={{ height: '100%' }}
              />
            </Sider>

            <Content
              style={{
                position: 'relative',
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
