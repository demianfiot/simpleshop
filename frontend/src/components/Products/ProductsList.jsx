import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";


const ProductsList = ({ products, onDelete, onEdit, onAddToCart }) => {
  const { currentUser } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <>
      <Grid>
        {products.map((product) => {
          const isOwner =
            Number(product.seller_id) === Number(currentUser?.id);
          const isOutOfStock = product.stock === 0;

          return (
            <Card
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              outOfStock={isOutOfStock}
            >
              <FakeImage>📦</FakeImage>
              <InfoContainer>
                <h2>{product.name}</h2>
                <Category>{product.category}</Category>
                <Price>${product.price}</Price>
              </InfoContainer>

              {isOutOfStock && !isOwner && <OutOfStock>Out of stock</OutOfStock>}

              {/* 🔹 OWNER кнопки */}
              {isOwner ? (
                <ActionsRow>
                  <EditButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(product);
                    }}
                  >
                    Edit
                  </EditButton>

                  <DeleteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(product.id);
                    }}
                  >
                    Delete
                  </DeleteButton>
                </ActionsRow>
              ) : (
                !isOutOfStock && (
                  <AddToCartButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </AddToCartButton>
                )
              )}
            </Card>
          );
        })}
      </Grid>

      {/* 🔥 MODAL */}
      {selectedProduct && (
        <Overlay onClick={() => setSelectedProduct(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalImage>
              <FakeImageBig>📦</FakeImageBig>
            </ModalImage>
            <ModalContent>
              <div className="info">
                <h2>{selectedProduct.name}</h2>
                <p><b>Category:</b> {selectedProduct.category}</p>
                <p><b>Description:</b> {selectedProduct.description}</p>
                <p><b>Price:</b> ${selectedProduct.price}</p>
                <p><b>Stock:</b> {selectedProduct.stock}</p>

                {selectedProduct.stock === 0 && (
                  <OutOfStock>Out of stock</OutOfStock>
                )}

                {Number(selectedProduct.seller_id) === Number(currentUser?.id) ? (
                  <ActionsRow>
                    <EditButton
                      onClick={() => {
                        onEdit(selectedProduct);
                        setSelectedProduct(null);
                      }}
                    >
                      Edit
                    </EditButton>

                    <DeleteButton
                      onClick={() => {
                        onDelete(selectedProduct.id);
                        setSelectedProduct(null);
                      }}
                    >
                      Delete
                    </DeleteButton>
                  </ActionsRow>
                ) : selectedProduct.stock > 0 ? (
                  <AddToCartButton
                    onClick={() => {
                      onAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    Add to Cart
                  </AddToCartButton>
                ) : null}
              </div>
            </ModalContent>

            <CloseButton onClick={() => setSelectedProduct(null)}>
              Close
            </CloseButton>
          </Modal>
        </Overlay>
      )}
    </>
  );
};

export default ProductsList;

//
// 🎨 STYLES
//

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
  padding: 10px;
`;

const Card = styled.div`
  background: white;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;

  opacity: ${(p) => (p.outOfStock ? 0.6 : 1)};
  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const FakeImage = styled.div`
  font-size: 70px;
  margin-bottom: 10px;
  text-align: center;
`;

const FakeImageBig = styled.div`
  font-size: 180px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  
  h2 {
    margin: 0;
    font-size: 18px;
  }
`;

const Category = styled.div`
  font-size: 13px;
  color: #777;
  margin: 0;
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #1f78ff;
  margin: 0;
`;

const OutOfStock = styled.div`
  margin-top: 8px;
  color: #ef4444;
  font-weight: bold;
`;

//
// 🔹 BUTTONS
//

const ActionsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const BaseButton = styled.button`
  height: 34px;
  padding: 0 12px;

  border: none;
  border-radius: 8px;

  cursor: pointer;
  font-weight: 600;
  font-size: 14px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
/* 🔹 повна кнопка */
const FullButton = styled(BaseButton)`
  width: 100%;
`;

const AddToCartButton = styled(FullButton)`
  background: #10b981;
  color: white;

  &:hover {
    background: #059669;
  }
`;

const HalfButton = styled(BaseButton)`
  flex: 1;
`;

/* 🔹 EDIT */
const EditButton = styled(HalfButton)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
`;


/* 🔹 DELETE */
const DeleteButton = styled(HalfButton)`
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
  }
`;

//
// 🔹 MODAL
//

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalImage = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  width: auto;
  height: auto;
  max-width: 220px;
  max-height: 220px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  position: relative; 
  background: white;
  padding: 25px;
  border-radius: 12px;
  width: 600px;
  min-height: 300px;
`;

const ModalContent = styled.div`
  display: block;

  .info {
    width: 100%;
    padding-right: 220px;
  }
`;
/* 🔹 close кнопка (та сама база) */
const CloseButton = styled(FullButton)`
  margin-top: 15px;
  background: #ccc;
  color: black;

  &:hover {
    background: #bfbfbf;
  }
`;