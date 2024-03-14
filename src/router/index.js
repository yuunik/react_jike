// 路由配置
import { createBrowserRouter } from "react-router-dom";
// 懒加载函数
import { Suspense, lazy } from "react";

// 一级路由
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
// 路由鉴权组件
import AuthRoute from "@/components/AuthRoute";

const Home = lazy(() => import("@/pages/Home"));
const Article = lazy(() => import("@/pages/Article"));
const Publish = lazy(() => import("@/pages/Publish"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <Suspense fallback="加载中..."><Home /></Suspense>,
      },
      {
        path: "article",
        element: <Suspense fallback="加载中..."><Article /></Suspense>,
      },
      {
        path: "publish",
        element: <Suspense fallback="加载中..."><Publish /></Suspense>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
