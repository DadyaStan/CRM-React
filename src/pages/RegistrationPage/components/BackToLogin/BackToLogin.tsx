import "./BackToLogin.scss";
import { NavLink } from "react-router";

const RegistrationPage = () => {
  return (
    <div className="registration-lower-text">
      Уже зарегистрированы?{" "}
      <NavLink to="/auth/login">
        <span className="registration-lower-text__inner-text">
          Войти в аккаунт
        </span>
      </NavLink>
    </div>
  );
};

export default RegistrationPage;
