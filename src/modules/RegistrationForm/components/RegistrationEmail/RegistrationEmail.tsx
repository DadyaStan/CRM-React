import { Form, Input } from "antd";

const RegistrationForm: React.FC = () => {
  return (
    <Form.Item
      name="email"
      label="Почтовый адрес:"
      validateDebounce={1000}
      rules={[
        {
          type: "email",
          message: "Некорректный почтовый адрес",
        },
        {
          required: true,
          message: "Введите почтовый адрес",
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default RegistrationForm;
