import { Form, Input } from "antd";

const RegistrationPhoneNumber: React.FC = () => {
  return (
    <Form.Item
      name="phoneNumber"
      label="Телефон:"
      validateDebounce={1000}
      rules={[
        {
          required: false,
          pattern: /^\+?[0-9\s\-()]{7,15}$/,
          message: `Введите корректный номер телефона`,
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default RegistrationPhoneNumber;
