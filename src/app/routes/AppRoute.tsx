import { Navigate, useLocation } from "react-router-dom";
import { type JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = localStorage.getItem("refreshToken") ? true : false;
  const location = useLocation();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={`/auth/login`} replace state={{ from: location }} />;
  }

  return children;
}
