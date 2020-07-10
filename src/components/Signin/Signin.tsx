import React from 'react';
import {history} from 'umi';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Signin.css';
import logo from './logo.png';

const Signin = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          window.sessionStorage.setItem('user_id', data.user_id);
          window.sessionStorage.setItem('token', data.token);
          history.push({
            pathname: '/',
          })
        } else {
          console.log('failed')
        }
      })
  };

  return (
    <div className='box-container'>
      <div className="box left-box">
        <img src={logo} alt="logo" />
      </div>
      <div className="box right-box">
        <Form
          name="normal_login"
          className="login-form"
          form={form}
          initialValues={{remember: true}}
          onFinish={onFinish}
        >
          <Form.Item>
            <p className="title">Sign in to MoneyWise.</p>
            </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input 
              size="large"
              prefix={<UserOutlined
              className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Sign in
            </Button>
          </Form.Item>

          <Form.Item>New to MoneyWise?
            <a href="/register"> register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;