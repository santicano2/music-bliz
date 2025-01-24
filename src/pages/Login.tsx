import { Navigate } from "react-router-dom";
import { Auth } from "../components/Auth";
import { useAuth } from "../lib/auth";

export function Login() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return <Auth />;
}
