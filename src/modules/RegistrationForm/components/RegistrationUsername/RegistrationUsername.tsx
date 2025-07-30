import { Form, Input } from "antd";

const RegistrationUsername: React.FC = () => {
  return (
    <Form.Item
      name="username"
      label="Имя:"
      validateDebounce={1000}
      rules={[
        {
          required: true,
          min: 1,
          message: "Введите имя пользователя",
        },
        {
          max: 60,
          message: "Введите меньше 60 символов",
        },
        {
          pattern: /^[a-zA-Zа-яА-ЯёЁ]{1,60}$/,
          message: "Символы русского/латинского алфавита!",
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default RegistrationUsername;
