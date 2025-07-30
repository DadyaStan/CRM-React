import { Form, Input } from "antd";

const RegistrationPasswordBlock: React.FC = () => {
  return (
    <>
      <Form.Item
        name="password"
        label="Пароль:"
        validateDebounce={1000}
        rules={[
          {
            required: true,
            message: "Введите корректный пароль",
            min: 6,
            max: 60,
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Повторите пароль:"
        validateDebounce={1000}
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Подтвердите пароль",
            min: 6,
            max: 60,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли не совпадают!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </>
  );
};

export default RegistrationPasswordBlock;
