import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";

// 组合 redux 子模块
const store = configureStore({
  reducer: {
    userState: userReducer,
  },
});

export default store;
