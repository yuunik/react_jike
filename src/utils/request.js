// axios 的封装处理
import axios from "axios";
import { _getToken, _removeToken } from "@/utils";
import { message } from "antd";

// 项目基地址
const baseURL = "http://geek.itheima.net/v1_0";

const request = axios.create({
  baseURL,
  timeout: 5000,
});

// 请求拦截器
// 在请求发送之前,做拦截.插入一些自定义的配置 [参数的处理]
request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // 请求头注入 token
    const token = _getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
// 在响应返回到客户端之前,做拦截.重点处理返回的数据.
request.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 超出 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么
    // 处理 401 错误
    if (error.response.status === 401) {
      message.warning("对不起, 您的身份已失效, 请重新登录......");
      // 清空原有的token
      _removeToken();
      // 跳转至登录页
      window.location.reload()
    }
    return Promise.reject(error);
  }
);

export default request;
