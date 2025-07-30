import CheckCircleOutlined from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const RegistrationSuccess: React.FC = () => {
  return (
    <div>
      <CheckCircleOutlined />
      <p>Регистрация прошла успешно!</p>
      <NavLink to="/auth/login">
        Перейти на страницу авторизации для входа в систему
      </NavLink>
    </div>
  );
};

export default RegistrationSuccess;
