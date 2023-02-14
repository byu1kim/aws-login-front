import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

// Custome Provider that returns global variables and functions
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const user = token ? jwtDecode(token) : null;

  const updateToken = (token) => {
    const newToken = localStorage.setItem("token", token);
    setToken(newToken);
    setLoading(true);
  };

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    setLoading(false);
  }, [token]);

  return <AuthContext.Provider value={{ token, user, loading, updateToken }}>{children}</AuthContext.Provider>;
};
