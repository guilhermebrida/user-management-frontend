import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth(redirectTo: string = "/login") {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate(redirectTo);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000); 

      if (payload.exp < now) {
        localStorage.removeItem("token");
        navigate(redirectTo);
      }
    } catch (err) {
      localStorage.removeItem("token");
      navigate(redirectTo);
    }
  }, [navigate, redirectTo]);
}
