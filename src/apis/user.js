// 用户相关的接口
import { request } from "@/utils";

// 登录
export const loginAPI = (data) => {
    return request({
        url: '/authorizations',
        method: 'post',
        data
    })
}

// 获取用户信息
export const getUserInfoAPI = () => {
    return request({
        url: '/user/profile',
        method: 'get'
    })
}