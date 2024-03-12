// 引入 React 核心库
import React from 'react'
// 引入 React 扩展库
import ReactDOM from 'react-dom'

// 引入 App 组件
import App from './App'

const root = ReactDOM.createRoot(document.querySelector(".root"))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)