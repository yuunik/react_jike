import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, clearUserInfo } from "@/store/modules/user";

import "./index.scss";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const { pathname: selectedKey } = useLocation();
  const dispatch = useDispatch();
  const { userInfo: { name } } = useSelector((state) => state.userState);

  // 菜单点击事件的回调
  const changeMenu = ({ key: path }) => {
    // 跳转二级路由
    navigate(path);
  };

  // 组件挂载时调用
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  // 退出登录
  const logout = () => {
    // 清空个人信息
    dispatch(clearUserInfo());
    navigate("/login");
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={logout}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={"/"}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
            onClick={changeMenu}
            selectedKeys={selectedKey}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
