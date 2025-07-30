import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "@/app/layouts/AuthLayout";
import MainLayout from "@/app/layouts/MainLayout";

import NotFoundPage from "@pages/NotFoundPage";
import RegistrationPage from "@pages/RegistrationPage/components/RegistrationPage";
import LoginPage from "@pages/LoginPage";
import TodoPage from "@pages/TodoPage";
import UserProfilePage from "@/pages/UserProfilePage/components/UserProfilePage/UserProfilePage";
import UsersTablePage from "@pages/UsersTablePage";
import UserProfileByIdPage from "@pages/UserProfileByIdPage";
import AuthRoute from "./routes/AuthRoute";
import AppRoute from "./routes/AppRoute";

//const basename = process.env.PUBLIC_URL || '/';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route element={<AuthLayout />}>
          <Route
            path="/auth/register"
            element={
              <AuthRoute>
                <RegistrationPage />
              </AuthRoute>
            }
          />
          <Route
            path="/auth/login"
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
        </Route>

        <Route
          element={
            <AppRoute>
              <MainLayout />
            </AppRoute>
          }
        >
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/users-list" element={<UsersTablePage />} />
          <Route path="/user/:id" element={<UserProfileByIdPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
