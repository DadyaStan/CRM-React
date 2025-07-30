import { useEffect, useState } from "react";

export default function useSession() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
}
