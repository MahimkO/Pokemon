import { createElement, useState } from 'react';
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Modal,
  Button,
  Input,
  Space,
} from 'antd';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';

import type { FC, ReactNode } from 'react';
import type { MenuProps } from 'antd';

type TProps = {
  children: ReactNode;
};

const { Header, Content, Footer, Sider } = Layout;

// NavBar элементы в виде массива объектов {key: string; label: string}
const NavBarItems: MenuProps['items'] = [
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
const SiderItems: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: createElement(icon),
    label: `subnav ${key}`,
    children: Array.from({ length: 4 }).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

export const AppLayout: FC<TProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setIsOpen(false);
  };

  return (
    <>
      <Layout
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#b0bfdaff',
          }}
        >
          <img
            src="./pokemon.png"
            height="95"
            style={{ marginRight: '15px' }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={NavBarItems}
            style={{ flex: 1, minWidth: 0, backgroundColor: '#b0bddaff' }}
          />
          <Button type="primary" onClick={showModal}>
            <LoginOutlined />
          </Button>
        </Header>

        <Layout style={{ flex: 1, padding: '0 48px' }}>
          <div style={{ width: '100%' }}>
            <Breadcrumb
              separator=">"
              items={[
                { title: <HomeOutlined /> },
                { title: <a href="">Pokemons</a> },
                { title: 'Pokemon' },
              ]}
              style={{ margin: '16px 0' }}
            />
          </div>

          <Layout
            style={{
              flex: 1,
              padding: '24px 0',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={SiderItems}
              />
            </Sider>

            <Content
              style={{
                flex: 1,
                padding: '24px',
                //   background: '#fff',
                borderRadius: borderRadiusLG,
                overflow: 'auto',
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>

        <Footer
          style={{
            textAlign: 'center',
            padding: '12px 0',
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
            status={username ? '' : 'error'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input.Password
            placeholder="Введите пароль"
            status={password ? '' : 'error'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onPressEnter={() => console.log('Pressed ENTER')}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ margin: '12px 0' }}
          />
        </Space>
      </Modal>
    </>
  );
};
