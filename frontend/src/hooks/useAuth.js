import { useState } from "react";
import { registerUser, loginUser } from "../api/authApi";

const { setCurrentUser } = useAuth();


export const useAuth = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const register = async (data) => {
    await registerUser(data);

    // автоматичний login після реєстрації
    return await login(data.email, data.password);
  };

  const login = (token) => {
    localStorage.setItem("token", token);

    const decoded = jwtDecode(token);

    setCurrentUser({
      id: decoded.user_id,
      role: decoded.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return {
    user,
    register,
    login,
    logout,
    isAuthenticated,
  };
};