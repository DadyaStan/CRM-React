import React, { useState } from "react";
import { Button, Form, message } from "antd";

import { fetchDataForRegistration } from "../../api/fetchDataForRegistration";

import { prepareDataForRequest } from "../../helpers/prepareDataForRequest";

import RegistrationUsername from "../RegistrationUsername";
import RegistrationLogin from "../RegistrationLogin";
import RegistrationPasswordBlock from "../RegistrationPasswordBlock";
import RegistrationEmail from "../RegistrationEmail";
import RegistrationPhoneNumber from "../RegistrationPhoneNumber";
import RegistrationSuccess from "../RegistrationSuccess";

const RegistrationForm: React.FC = () => {
  const [isDataSent, setIsDataSent] = useState<boolean>(false);

  const handleRegisterUser = async (values: any) => {
    const preparedData = prepareDataForRequest(values);

    try {
      await fetchDataForRegistration(preparedData);
      setIsDataSent(true);
    } catch (error) {
      if (error instanceof Error && error.message === "409") {
        message.error("Такой логин или почта уже существует");
      } else {
        message.error(`Ошибка при создании профиля: ${error}`);
      }
    }
  };

  return (
    <>
      {!isDataSent ? (
        <Form
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 13 }}
          layout="horizontal"
          name="nest-messages"
          onFinish={handleRegisterUser}
          style={{ width: 380 }}
        >
          <RegistrationUsername />
          <RegistrationLogin />
          <RegistrationPasswordBlock />
          <RegistrationEmail />
          <RegistrationPhoneNumber />

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <RegistrationSuccess />
      )}
    </>
  );
};

export default RegistrationForm;
