import styled from "styled-components";
import { createOrder } from "../../api/ordersApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const OrderProduct = ({ cart, removeFromCart, clearCart }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleCheckout = async () => {
    if (!currentUser) {
      navigate("/auth"); // редірект на логін
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
      alert("Order created successfully");
      window.location.href = "/";
    } catch (err) {
      console.error("Order failed", err);
      alert("Order failed");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Wrapper>
      <h3>Cart</h3>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <Item key={item.id}>
          <Info>
            <span>{item.name}</span>
            <Quantity>x{item.quantity}</Quantity>
          </Info>
          <RemoveButton onClick={() => removeFromCart(item.id)}>✕</RemoveButton>
        </Item>
      ))}

      {cart.length > 0 && (
        <>
          <Total>Total: ${total.toFixed(2)}</Total>
          <CheckoutButton onClick={handleCheckout}>Create Order</CheckoutButton>
        </>
      )}
    </Wrapper>
  );
};

export default OrderProduct;

const Wrapper = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Info = styled.div`
  display: flex;
  gap: 8px;
`;

const Quantity = styled.span`
  color: gray;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.7;
  }
`;

const Total = styled.div`
  margin-top: 12px;
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #22c55e;
  color: white;
  cursor: pointer;

  &:hover {
    background: #16a34a;
  }
`;