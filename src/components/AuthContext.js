import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();
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
    setLoading(false);
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, updateToken, loading, setLoading }}>{children}</AuthContext.Provider>
  );
};
