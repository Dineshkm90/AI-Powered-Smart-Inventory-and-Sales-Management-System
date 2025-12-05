import { Button, Form, Input, message, Card } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../asset/images/brand-logo.png';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    console.log('Login value', value);
    try {
      dispatch({ type: 'SHOW_LOADING' });
      const res = await axios.post('/api/users/login', value);
      dispatch({ type: 'HIDE_LOADING' });

      message.success('User Login Successfully!');
      delete res?.data?.user?.password;
      localStorage.setItem('auth', JSON.stringify(res?.data?.user));
      navigate('/');
    } catch (error) {
      dispatch({ type: 'HIDE_LOADING' });
      message.error(error.response?.data?.message || 'Login Failed!');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <Card className="login-card" bordered={false}>
          <div className="logo-container">
            <img src={logo} alt="logo" className="brand-logo" />
            <h2 className="brand-title">Smart Inventory Management</h2>
            <p className="login-subtitle">Please login to continue</p>
          </div>

          <Form layout="vertical" onFinish={handlerSubmit}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input
                prefix={<MailOutlined className="input-icon" />}
                placeholder="Enter Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="input-icon" />}
                placeholder="Enter Password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                size="large"
              />
            </Form.Item>

            <div className="form-btn-group">
              <Button
                htmlType="submit"
                type="primary"
                icon={<LoginOutlined />}
                size="large"
                className="login-btn"
              >
                Login
              </Button>
            </div>

            <div className="register-link">
              <span>Don't have an account? </span>
              <Link to="/register">Register Here</Link>
            </div>
          </Form>

          <small className="footer">Smartory</small>
        </Card>
      </div>
    </div>
  );
};

export default Login;
