// 封装与 token 相关的方法

// 常量 - token 的 key 值
const TOKEN_KEY = "token"

// 设置 token
export const _setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

// 删除 token
export const _removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

// 查询 token
export const _getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}