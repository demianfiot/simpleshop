import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const ProductModal = ({ product, onClose, onEdit, onDelete, onAddToCart }) => {
  const { currentUser } = useAuth();
  const isOwner = Number(product.seller_id) === Number(currentUser?.id);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ContentArea>
          <TextContent>
            <h2>{product.name}</h2>
            <Detail><b>Category:</b> {product.category}</Detail>
            <Detail><b>Description:</b> {product.description}</Detail>
            <Detail><b>Price:</b> ${product.price}</Detail>
            <Detail><b>Stock:</b> {product.stock}</Detail>

            {product.stock === 0 && (
              <OutOfStockLabel>Out of stock</OutOfStockLabel>
            )}
          </TextContent>
          <ImageContent>📦</ImageContent>
        </ContentArea>

        <ActionsArea>
          {isOwner ? (
            <ActionsRow>
              <EditBtn onClick={() => { onEdit(product); onClose(); }}>
                Edit
              </EditBtn>
              <DeleteBtn onClick={() => { onDelete(product.id); onClose(); }}>
                Delete
              </DeleteBtn>
            </ActionsRow>
          ) : product.stock > 0 ? (
            <AddBtn onClick={() => { onAddToCart(product); onClose(); }}>
              Add to Cart
            </AddBtn>
          ) : null}

          <CloseBtn onClick={onClose}>Close</CloseBtn>
        </ActionsArea>
      </Modal>
    </Overlay>
  );
};

export default ProductModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.modalBg};
  padding: 36px;
  border-radius: ${({ theme }) => theme.radii.lg};
  width: 100%;
  max-width: 560px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ContentArea = styled.div`
  display: flex;
  gap: 28px;
  align-items: flex-start;
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    margin: 0 0 4px;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ImageContent = styled.div`
  font-size: 140px;
  line-height: 1;
  flex-shrink: 0;
`;

const Detail = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const OutOfStockLabel = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-weight: 700;
  font-size: 14px;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ActionsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionsRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Btn = styled.button`
  flex: 1;
  height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  font-size: 15px;
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

const AddBtn = styled.button`
  width: 100%;
  height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.success};
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.successHover};
  }
`;

const CloseBtn = styled.button`
  width: 100%;
  height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.8;
  }
`;
