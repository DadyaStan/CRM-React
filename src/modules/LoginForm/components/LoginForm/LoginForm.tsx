import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

import { fetchAndSetRole, signin } from "../../api";
import type { AuthData } from "../../types/login";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: AuthData) => {
    try {
      await signin(values);
      await fetchAndSetRole();
      navigate("/todo");
    } catch (error: any) {
      if (error.status === 400) {
        message.error("400 Bad Request: Ошибка десериализации запроса или неверный ввод.");
      } else if (error.status === 401) {
        message.error("401 Unauthorized: Неверные учетные данные.");
      } else if (error.status === 500) {
        message.error("500 Internal Server Error: Внутренняя ошибка сервера.");
      }
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
