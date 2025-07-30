import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

import { signin } from "../../api";
import tokenService from "@/shared/api/token.service";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      console.log("Received values of form: ", values);
      await signin(values);

      console.log(tokenService.getTokenExpiration());
      navigate("/profile");
    } catch (error: any) {
      message.error(error.message);
      console.log(error);
    }
  };

  return (
    <Form
      name="authorization"
      initialValues={{ remember: true }}
      style={{ width: 250 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="login"
        rules={[{ required: true, message: "Введите ваш логин" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Логин" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Введите пароль" }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
      <br />
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Войти
        </Button>
        или <NavLink to="/auth/register">Зарегистрироваться сейчас!</NavLink>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
