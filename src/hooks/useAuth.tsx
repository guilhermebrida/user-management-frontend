import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth(redirectTo: string = "/login") {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate(redirectTo);
    }
  }, [navigate, redirectTo]);
}
