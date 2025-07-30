import { Navigate } from "react-router-dom";
import useSession from "@/hooks/useSession";
import type { JSX } from "react";

interface AuthRouteProps {
  children: JSX.Element;
}

export default function AuthRoute({ children }: AuthRouteProps) {
  const isAuthenticated = useSession();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/todo" replace />;
  }

  return children;
}
