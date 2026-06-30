import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const ProductCard = ({ product, onEdit, onDelete, onAddToCart, onClick }) => {
  const { currentUser } = useAuth();
  const isOwner = Number(product.seller_id) === Number(currentUser?.id);
  const isOutOfStock = product.stock === 0;

  return (
    <Card outOfStock={isOutOfStock} onClick={() => onClick(product)}>
      <FakeImage>📦</FakeImage>
      <InfoContainer>
        <Title>{product.name}</Title>
        <CategoryLabel>{product.category}</CategoryLabel>
        <PriceTag>${product.price}</PriceTag>
        {isOutOfStock && <OutOfStockLabel>Out of stock</OutOfStockLabel>}
      </InfoContainer>

      {isOwner ? (
        <ActionsRow>
          <EditBtn onClick={(e) => { e.stopPropagation(); onEdit(product); }}>
            Edit
          </EditBtn>
          <DeleteBtn onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}>
            Delete
          </DeleteBtn>
        </ActionsRow>
      ) : !isOutOfStock ? (
        <CartBtn onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
          Add to Cart
        </CartBtn>
      ) : null}
    </Card>
  );
};

export default ProductCard;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 20px;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: ${(p) => (p.outOfStock ? "default" : "pointer")};
  text-align: left;
  opacity: ${(p) => (p.outOfStock ? 0.5 : 1)};
  transition: all ${({ theme }) => theme.transitions.normal};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${(p) => (p.outOfStock ? p.theme.colors.border : p.theme.colors.primary)};
  }
`;

const FakeImage = styled.div`
  font-size: 72px;
  text-align: center;
  margin-bottom: 14px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const CategoryLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PriceTag = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 4px;
`;

const OutOfStockLabel = styled.div`
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.danger};
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ActionsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const Btn = styled.button`
  flex: 1;
  height: 36px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
`;

const EditBtn = styled(Btn)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const DeleteBtn = styled(Btn)`
  background: ${({ theme }) => theme.colors.danger};
  color: white;

  &:hover {
    background: ${({ theme }) => theme.colors.dangerHover};
  }
`;

const CartBtn = styled(Btn)`
  flex: none;
  width: 100%;
  background: ${({ theme }) => theme.colors.success};
  color: white;

  &:hover {
    background: ${({ theme }) => theme.colors.successHover};
  }
`;
