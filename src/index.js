// 引入 React 核心库
import React from "react";
// 引入 React 扩展库
import ReactDOM from "react-dom/client";
// 引入 路由注入组件
import { RouterProvider } from "react-router-dom";
// 引入 状态管理库注入组件
import { Provider } from "react-redux";

// 引入 路由
import router from "@/router";
// 引入 状态管理库
import store from "@/store";

// 引入 重置样式
import "normalize.css";
// 引入 初始样式
import "@/index.scss";

const root = ReactDOM.createRoot(document.querySelector(".root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
