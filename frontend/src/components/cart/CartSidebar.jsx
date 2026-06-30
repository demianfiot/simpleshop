import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../api/ordersApi";
import { showToast } from "../ui/Toast";

const CartSidebar = ({ cart, removeFromCart, clearCart }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!currentUser) {
      navigate("/auth");
      return;
    }

    if (cart.length === 0) return;

    try {
      await createOrder(
        cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        }))
      );
      clearCart();
      window.location.href = "/";
    } catch (err) {
      console.error("Order failed", err);
      showToast("Order failed", "error");
    }
  };

  return (
    <Wrapper>
      <Title>Shopping Cart</Title>

      {cart.length === 0 && <Empty>Cart is empty</Empty>}

      {cart.map((item) => (
        <Item key={item.id}>
          <Info>
            <ItemName>{item.name}</ItemName>
            <ItemMeta>
              ${item.price} x{item.quantity}
            </ItemMeta>
          </Info>
          <RemoveBtn onClick={() => removeFromCart(item.id)}>✕</RemoveBtn>
        </Item>
      ))}

      {cart.length > 0 && (
        <>
          <TotalRow>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </TotalRow>
          <CheckoutBtn onClick={handleCheckout}>
            Create Order
          </CheckoutBtn>
        </>
      )}
    </Wrapper>
  );
};

export default CartSidebar;

const Wrapper = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h3`
  margin: 0 0 16px;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Empty = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-of-type {
    border-bottom: none;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ItemName = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemMeta = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  font-size: 16px;
  padding: 4px;

  &:hover {
    opacity: 0.7;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const CheckoutBtn = styled.button`
  margin-top: 12px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.success};
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.successHover};
  }
`;
