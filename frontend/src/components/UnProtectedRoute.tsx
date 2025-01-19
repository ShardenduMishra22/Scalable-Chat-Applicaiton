import { Navigate } from "react-router-dom";

const UnProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  if (user) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};

export default UnProtectedRoute;