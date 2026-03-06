import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setCurrentUser({
          id: decoded.user_id,
          role: decoded.role,
        });
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }

    setLoading(false); 
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    window.location.href = "/auth";
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);