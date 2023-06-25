import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth } = useAuthContext();

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
