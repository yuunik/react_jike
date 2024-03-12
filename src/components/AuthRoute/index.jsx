import { _getToken } from "@/utils";
import { message } from "antd";
import { Navigate } from "react-router-dom";

// 路由鉴权组件
const AuthRoute = ({ children }) => {
  const token = _getToken();
  if (token) {
    // 有 token, 则跳转首页
    return <>{children}</>;
  } else {
    // 没有 token, 则跳转登录页
    // 提示信息
    message.warning("您尚未登录,请登录!");
    return <Navigate to="/login" replace />;
  }
};

export default AuthRoute;
