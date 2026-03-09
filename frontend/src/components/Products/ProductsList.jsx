import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const ProductsList = ({ products, onDelete, onEdit, onAddToCart }) => {
  const { currentUser } = useAuth();

  if (products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <Grid>
      {products.map((product) => (
        <Card key={product.id} outOfStock={product.stock === 0}>
          <h3>{product.name}</h3>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
            {/* {product.stock === 0 && (
              <Badge variant="danger">Out of stock</Badge>
            )} */}
          {Number(product.seller_id) !== Number(currentUser?.id) ? (
            <AddToCartButton
              onClick={() => {
                onAddToCart(product);
              }}
            >
              Add to Cart
            </AddToCartButton>
          ) : (
            <Actions>
              <EditButton onClick={() => onEdit(product)}>Edit</EditButton>
              <DeleteButton onClick={() => onDelete(product.id)}>Delete</DeleteButton>
            </Actions>
          )}
        </Card>
      ))}
    </Grid>
  );
};

export default ProductsList;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin: 0 0 0 10px ;
`;

const Card = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  opacity: ${(props) => (props.$outOfStock ? 0.6 : 1)};
  transition: transform 0.1s ease, opacity 0.2s ease;

  &:hover {
    transform: ${(props) =>
      props.$outOfStock ? "none" : "translateY(-1px)"};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: white;
`;

const EditButton = styled(Button)`
  background-color: #6fa6ff;

  &:hover {
    background-color: #2563eb;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #fd8484;

  &:hover {
    background-color: #dc2626;
  }
`;

const AddToCartButton = styled(Button)`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  background-color: #10b981;

  &:hover {
    background-color: #059669;
  }
`;

// const Badge = styled.span`
//   display: inline-block;
//   padding: 4px 8px;
//   border-radius: 6px;
//   font-size: 12px;
//   font-weight: 600;
//   margin-top: 6px;

//   background-color: ${(props) =>
//     props.variant === "danger" ? "#fee2e2" : "#dcfce7"};

//   color: ${(props) =>
//     props.variant === "danger" ? "#dc2626" : "#16a34a"};
// `;
