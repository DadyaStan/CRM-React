import "./MainLayout.scss";
import { NavLink } from "react-router";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useLocation, Outlet } from "react-router";
const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const userRole = localStorage.getItem("userRole");

  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className="app-wrapper">
      <Layout className="app-content">
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 99,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo">CRM-React</div>

          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            style={{ flex: 1, minWidth: 0, fontWeight: 600 }}
          >
            <Menu.Item key="/todo">
              <NavLink to="/todo">Задачи</NavLink>
            </Menu.Item>
            <Menu.Item key="/profile">
              <NavLink to="/profile">Профиль</NavLink>
            </Menu.Item>
            {userRole === "ADMIN" ? (
              <Menu.Item key="/users-list">
                <NavLink to="/users-list">Пользователи</NavLink>
              </Menu.Item>
            ) : (
              <></>
            )}
          </Menu>
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 24,
              minWidth: "100%",
              minHeight: "calc(100vh - 64px - 16px - 48px - 40px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <main className="app-content">
              <Outlet />
            </main>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default MainLayout;
