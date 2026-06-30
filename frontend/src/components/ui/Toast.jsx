import { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";

let toastId = 0;
let addToastGlobal = null;

export const showToast = (message, type = "info") => {
  if (addToastGlobal) {
    addToastGlobal({ id: ++toastId, message, type });
  }
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    setToasts((prev) => [...prev, toast]);
  }, []);

  useEffect(() => {
    addToastGlobal = addToast;
    return () => { addToastGlobal = null; };
  }, [addToast]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Container>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        >
          {toast.message}
        </ToastItem>
      ))}
    </Container>
  );
};

const ToastItem = ({ children, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastWrapper type={type} onClick={onClose}>
      <Icon>
        {type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}
      </Icon>
      {children}
    </ToastWrapper>
  );
};

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToastWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  animation: ${slideIn} 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  background: ${({ type, theme }) =>
    type === "success"
      ? theme.colors.success
      : type === "error"
        ? theme.colors.danger
        : theme.colors.primary};
`;

const Icon = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

export default ToastContainer;
