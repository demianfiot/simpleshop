import { useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import { registerUser, loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../components/ui/Toast";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const { login } = useAuth();

  const handleSubmit = async (data) => {
    try {
      if (mode === "register") {
        await registerUser(data);
        const res = await loginUser({
          email: data.email,
          password: data.password,
        });
        login(res.token, res.user);
      } else {
        const res = await loginUser(data);
        login(res.token, res.user);
      }
      window.location.href = "/";
    } catch (err) {
      console.error("Auth failed", err);
      showToast("Authentication failed. Check your credentials.", "error");
    }
  };

  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <AuthForm mode={mode} onSubmit={handleSubmit} switchMode={switchMode} />
  );
};

export default AuthPage;
