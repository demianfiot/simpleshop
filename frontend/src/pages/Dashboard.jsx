import { useState, useMemo, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../context/AuthContext";
import Header from "../Header";
import ProductsList from "../components/Products/ProductsList";
import AddProduct from "../components/Products/AddProduct";
import OrderProduct from "../components/Orders/OrderProduct";
import styled from "styled-components";

const Dashboard = () => {
  const { currentUser } = useAuth(); 
  const { products, fetchProducts, addProduct, editProduct, removeProduct } = useProducts();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");

  // завантажуємо продукти після завантаження профілю
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (data) => {
    if (editingProduct) {
      await editProduct(editingProduct.id, data);
      setEditingProduct(null);
    } else {
      await addProduct(data);
    }
    // fetchProducts викликається всередині hook після add/edit
  };

  const handleDelete = async (id) => {
    await removeProduct(id);
    // fetchProducts викликається всередині hook → список синхронний
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <StyledWrapper>
      <Header />

      <div className="dashboard">
        <div className="left">
          <AddProduct
            onSubmit={handleSubmit}
            editingProduct={editingProduct}
            clearEditing={() => setEditingProduct(null)}
          />

          <OrderProduct
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        </div>

        <div className="right">
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ProductsList
            products={filteredProducts}
            onDelete={handleDelete}
            onEdit={(product) => setEditingProduct(product)}
            onAddToCart={addToCart}
          />
        </div>
      </div>
    </StyledWrapper>
  );
};



const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .dashboard {
    display: flex;
    margin-top: 80px;
    min-height: calc(100vh - 80px);
  }

  .left {
    width: 360px;
    flex-shrink: 0;
    background-color: #f3f3f3;

    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 25px;
    overflow-y: auto;
  }

  .right {
    flex: 1;
    background-color: #e9e9e9;
    padding: 20px;
  }
`;
const SearchInput = styled.input`
  width: 1455px;
  background-color: #f5f5f5;
  color: #242424;
  padding: .15rem .5rem;
  margin: 10px;
  min-height: 40px;
  border-radius: 4px;
  outline: none;
  border: none;
  line-height: 1.15;
  box-shadow: 0px 10px 20px -18px;

  &:focus {
  border-bottom: 2px solid #5b5fc7;
  border-radius: 4px 4px 2px 2px;
}

  &:hover {
    outline: 1px solid lightgrey;
  }
`;
export default Dashboard;