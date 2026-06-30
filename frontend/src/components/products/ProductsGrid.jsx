import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import styled from "styled-components";

const ProductsGrid = ({ products, onDelete, onEdit, onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!products || products.length === 0) {
    return <Empty>No products available</Empty>;
  }

  return (
    <>
      <Grid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddToCart={onAddToCart}
            onClick={setSelectedProduct}
          />
        ))}
      </Grid>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
};

export default ProductsGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 16px;
`;

const Empty = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 40px;
  font-size: 16px;
`;
