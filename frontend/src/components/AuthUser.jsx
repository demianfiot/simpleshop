import { useState } from "react";
import styled from "styled-components";

const AuthUser = ({ mode = "login", onSubmit, switchMode }) => {
  const isRegister = mode === "register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      onSubmit({ name, email, password });
    } else {
      onSubmit({ email, password });
    }
  };

  return (
    <Wrapper>
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">
            {isRegister ? "Register" : "Login"}
          </span>

          <span className="subtitle">
            {isRegister
              ? "Create your account"
              : "Welcome back"}
          </span>

          <div className="form-container">

            {isRegister && (
              <input
                type="text"
                placeholder="Name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>


          <button type="submit">
            {isRegister ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="form-section">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <a onClick={switchMode}>Login</a>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <a onClick={switchMode}>Register</a>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .form-box {
    max-width: 300px;
    background: #f1f7fe;
    overflow: hidden;
    border-radius: 16px;
    color: #010101;
  }

  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 32px 24px 24px;
    gap: 16px;
    text-align: center;
  }

  .title {
    font-weight: bold;
    font-size: 1.6rem;
  }

  .subtitle {
    font-size: 1rem;
    color: #666;
  }

  .form-container {
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    margin: 1rem 0 .5rem;
    width: 100%;
    box-shadow: inset 2px 5px 10px rgba(0,0,0,0.1);
  }

  .input {
    background: none;
    border: 0;
    outline: 0;
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: .9rem;
    padding: 8px 15px;
  }

  .form-section {
    padding: 16px;
    font-size: .85rem;
    background-color: #e0ecfb;
    box-shadow: rgb(0 0 0 / 8%) 0 -1px;
    text-align: center;
  }

  .form-section a {
    font-weight: bold;
    color: #0066ff;
    cursor: pointer;
    transition: color .3s ease;
  }

  .form-section a:hover {
    color: #005ce6;
    text-decoration: underline;
  }

  .form button {
    background-color: #0066ff;
    color: #fff;
    border: 0;
    border-radius: 24px;
    padding: 10px 16px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color .3s ease;
  }

  .form button:hover {
    background-color: #005ce6;
  }
`;

export default AuthUser;
