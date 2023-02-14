import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <></>;
  } else {
    if (!token) {
      return <Navigate to="/restrict" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
