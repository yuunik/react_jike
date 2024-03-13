import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { _setToken, _getToken } from "@/utils";

const userStore = createSlice({
  name: "userStore",
  // 状态初始化
  initialState: {
    // token 信息
    token: _getToken() || "",
    // 用户信息
    userInfo: {},
  },
  reducers: {
    // 设置 token
    setToken: (state, action) => {
      state.token = action.payload;
      // token 持久化
      _setToken(action.payload);
    },
    // 设置 用户信息
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

const { setToken, setUserInfo } = userStore.actions;

/* 异步 actions */
// 完成登录获取 token
const login = (data) => {
  return async (dispatch) => {
    const result = await request({
      url: "/authorizations",
      method: "post",
      data,
    });
    // 保存 token
    dispatch(setToken(result.data.token));
  };
};

// 获取用户信息
const getUserInfo = () => {
  return async (dispatch) => {
    const result = await request({
      url: "/user/profile",
      method: "get",
    });
    // 保存用户信息
    dispatch(setUserInfo(result.data));
  };
};

// 导出 actions
export { login, getUserInfo };

const userReducer = userStore.reducer;
// 导出 reducer
export default userReducer;
