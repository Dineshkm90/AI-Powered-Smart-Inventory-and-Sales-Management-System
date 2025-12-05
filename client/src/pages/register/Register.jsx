import { Button, Form, Input, message, Card } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, FormOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../asset/images/brand-logo.png';
import './Register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    try {
      dispatch({ type: 'SHOW_LOADING' });
      await axios.post('/api/users/register', value);
      message.success('Registered Successfully! Please login.');
      navigate('/login');
      dispatch({ type: 'HIDE_LOADING' });
    } catch (error) {
      dispatch({ type: 'HIDE_LOADING' });
      message.error('Registration failed!');
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="register-container">
      <div className="register-box">
        <Card className="register-card" bordered={false}>
          <div className="logo-container">
            <img src={logo} alt="logo" className="brand-logo" />
            <h2 className="brand-title">Smart Inventory Management</h2>
            <p className="register-subtitle">Create your account</p>
          </div>

          <Form layout="vertical" onFinish={handlerSubmit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input
                prefix={<UserOutlined className="input-icon" />}
                placeholder="Enter your name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Invalid email format!' },
              ]}
            >
              <Input
                prefix={<MailOutlined className="input-icon" />}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>

            <div className="form-btn-group">
              <Button
                htmlType="submit"
                type="primary"
                icon={<FormOutlined />}
                size="large"
                className="register-btn"
              >
                Register
              </Button>
            </div>

            <div className="login-link">
              <span>Already have an account? </span>
              <Link to="/login">Login Here</Link>
            </div>
          </Form>

          <small className="footer">Smartory</small>
        </Card>
      </div>
    </div>
  );
};

export default Register;
