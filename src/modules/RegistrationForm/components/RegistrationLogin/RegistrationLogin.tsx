import { Form, Input } from "antd";

const RegistrationLogin: React.FC = () => {
  return (
    <Form.Item
      name="login"
      label="Логин:"
      validateDebounce={1000}
      rules={[
        { required: true, message: "Создайте логин" },
        { min: 2, message: "Введите больше 1 символа" },
        { max: 60, message: "Введите меньше 60 символов" },
        {
          pattern: /^[a-zA-Z]{2,60}$/,
          message: "Символы латинского алфавита!",
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default RegistrationLogin;
