import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { _setToken, _getToken } from "@/utils";

const userStore = createSlice({
  name: "userStore",
  // 状态初始化
  initialState: {
    token: _getToken() || "",
  },
  reducers: {
    // 设置 token
    setToken: (state, action) => {
      state.token = action.payload;
      // token 持久化
      _setToken(action.payload)
    },
  },
});

const { setToken } = userStore.actions;

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

// 导出 actions
export { login };

const userReducer = userStore.reducer;
// 导出 reducer
export default userReducer;
