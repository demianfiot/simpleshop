import { useState } from "react";
import styled from "styled-components";

const AuthForm = ({ mode = "login", onSubmit, switchMode }) => {
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
      <FormBox>
        <Form onSubmit={handleSubmit}>
          <Title>{isRegister ? "Create Account" : "Welcome Back"}</Title>
          <Subtitle>
            {isRegister
              ? "Sign up to get started"
              : "Sign in to your account"}
          </Subtitle>

          <Inputs>
            {isRegister && (
              <Input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Inputs>

          <SubmitBtn type="submit">
            {isRegister ? "Create Account" : "Sign In"}
          </SubmitBtn>
        </Form>

        <SwitchSection>
          {isRegister ? (
            <span>
              Already have an account?{" "}
              <SwitchLink onClick={switchMode}>Sign in</SwitchLink>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <SwitchLink onClick={switchMode}>Create one</SwitchLink>
            </span>
          )}
        </SwitchSection>
      </FormBox>
    </Wrapper>
  );
};

export default AuthForm;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: ${({ theme }) => theme.colors.bg};
`;

const FormBox = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px 32px 24px;
  gap: 20px;
  text-align: center;
`;

const Title = styled.span`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.5px;
`;

const Subtitle = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: -12px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Input = styled.input`
  background: ${({ theme }) => theme.colors.inputBg};
  border: none;
  outline: none;
  height: 48px;
  width: 100%;
  padding: 0 16px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:focus {
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.borderFocus};
  }

  &:last-child {
    border-bottom: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SubmitBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const SwitchSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 32px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SwitchLink = styled.a`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
    text-decoration: underline;
  }
`;
