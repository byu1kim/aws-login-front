import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, token, loading } = useContext(AuthContext);
  useEffect(() => {
    // console.log("Hi!");
    // console.log(user);
  }, [token]);

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
