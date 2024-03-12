import { Card, Form, Input, Button } from 'antd'
import './index.scss'
import logo from '@/assets/logo.png'

const Login = () => {
  // 提交表单
  const onSubmit = (values) => {
    console.log(values);
  }  

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form validateTrigger="onBlur" onFinish={ onSubmit }>
          <Form.Item 
            name="mobile" 
            rules={[
                {
                    required: true,
                    message: "手机号码不能为空!"
                },
                {
                    pattern: /^1[3-9]\d{9}$/,
                    message: "请输入11位的手机号码!"
                }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item 
            name="code" 
            rules={[
                {
                    required: true,
                    message: "验证码不能为空!"
                },
                {
                    pattern: /^[0-9]\d{5}$/,
                    message: "请输入6位的验证码!"
                }
            ]}>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login