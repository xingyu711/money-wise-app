import React from 'react';
import {history} from 'umi';
import { Button, Form, Input, Popover, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import './Register.css';
import logo from './logo.png';

const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;

const pwdRequirement = (
  <div>
    <p>A valid password must:</p>
    <li>
      <ul>Contain at least 1 lowercase letter</ul>
      <ul>Contain at least 1 uppercase letter</ul>
      <ul>Contain at least 1 digit</ul>
      <ul>Has a minimum length of 8</ul>
    </li>
  </div>
)

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          if (user.id) {
            history.goBack();
          } else {
            console.log('failed')
          }
        }
      })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="box_container">
      <div className="box left_box">
        <img src={logo} alt="logo" />
      </div>
      <div className="box right_box">
        
        <Form
          form={form}
          className="register_form"
          name="register"
          onFinish={onFinish}
        >
          <p className="title">Welcome to MoneyWise!</p>
          <p>First Name</p>
          <Form.Item
            name="firstname"
            rules={[
              { required: true, message: 'Please enter your first name!'}
            ]}
          >
            
            <Input  placeholder="Money"/>
          </Form.Item>

          <p>Last Name</p>
          <Form.Item
            name="lastname"
            rules={[
              { required: true, message: 'Please enter your last name!'}
            ]}
          >
            
            <Input placeholder="Wise"/>
          </Form.Item>

          <p>Email</p>
          <Form.Item
            name="email"
            rules={[
              {type: 'email', message: 'Please enter valid email address'},
              {required: true, message: 'Please enter your email'}
            ]}
          >
            <Input placeholder="moneywise@gmail.com"/>
          </Form.Item>

          <p>Password&nbsp;
            <Tooltip title="A valid password must have at least 1 lowercase letter, 1 upper case letter, 1 digit and a length between 8 and 20.">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          </p>

          <Form.Item
            name="password"
            rules={[
              {required: true, message: 'Please enter your password'},
              () => ({
                validator(rule, value) {
                  if (pwdRegex.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Password does not meet requirements.');
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          {/* <Popover content={content} title="Title">
            <Button type="primary">Hover me</Button>
          </Popover>, */}


          <p>Confirm Password</p>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {required: true, message: 'Please confirm your password!'},
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The passwords do not match!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              Register
            </Button>
          </Form.Item>

          <Form.Item>Already have an account?
            <a href="/signin"> Sign in</a>
          </Form.Item>

        </Form>
      </div>
    </div>
  )
}

export default Register;