// 路由配置
import { createBrowserRouter } from "react-router-dom";

// 一级路由
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
// 路由鉴权组件
import AuthRoute from "@/components/AuthRoute";
// 二级路由
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'article',
        element: <Article />
      },
      {
        path: 'publish',
        element: <Publish />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
