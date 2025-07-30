import "./AuthLayout.scss";
import reactImg from "@assets/react.png";

import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-sidebar">
        <img src={reactImg} alt="react" />
        <h1 className="auth-sidebar-heading">CRM-React</h1>
      </div>
      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
