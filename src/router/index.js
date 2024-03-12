// 路由配置
import { createBrowserRouter } from "react-router-dom";

import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
// 路由鉴权组件
import AuthRoute from "@/components/AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Layout/></AuthRoute>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

export default router;
