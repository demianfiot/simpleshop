import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  AuthUser  from "../components/AuthUser";
import { registerUser, loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();
  const { login } = useAuth(); // беремо login з контексту

  const handleSubmit = async (data) => {
    try {
      let token, user;

      if (mode === "register") {
        //  Реєстрація
        await registerUser(data);

        //  Авто-логін після реєстрації
        const res = await loginUser({
          email: data.email,
          password: data.password,
        });

        token = res.token;
        user = res.user;
      } else {
        // LOGIN
        const res = await loginUser(data);
        token = res.token;
        user = res.user;
      }

      // Оновлюємо стан в AuthContext
      login(token, user);

      // 3Редірект після логіну
      navigate("/"); //main
    } catch (err) {
      console.error("Auth failed", err);
      alert("Authentication failed");
    }
  };

  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <AuthUser
      mode={mode}
      onSubmit={handleSubmit}
      switchMode={switchMode}
    />
  );
};

export default AuthPage;