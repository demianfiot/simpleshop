import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // поки перевіряємо токен, показуємо спінер або нічого
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;