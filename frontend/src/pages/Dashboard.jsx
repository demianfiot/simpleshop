import { useState, useMemo, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../hooks/useProfile";
import AppLayout from "../components/layout/AppLayout";
import ProductsGrid from "../components/products/ProductsGrid";
import ProductForm from "../components/products/ProductForm";
import CartSidebar from "../components/cart/CartSidebar";
import FiltersPanel from "../components/filters/FiltersPanel";
import styled from "styled-components";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { products, fetchProducts, addProduct, editProduct, removeProduct } = useProducts();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [mode, setMode] = useState("filters");
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchProducts();
    }
  }, [currentUser]);

  const handleSubmit = async (data) => {
    if (editingProduct) {
      await editProduct(editingProduct.id, data);
      setEditingProduct(null);
    } else {
      await addProduct(data);
      setMode("filters");
    }
  };

  const handleDelete = async (id) => {
    await removeProduct(id);
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products
      .filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((p) =>
        minPrice ? p.price >= Number(minPrice) : true
      )
      .filter((p) =>
        maxPrice ? p.price <= Number(maxPrice) : true
      )
      .filter((p) =>
        category
          ? p.category.toLowerCase().includes(category.toLowerCase())
          : true
      );
  }, [products, search, minPrice, maxPrice, category]);

  return (
    <AppLayout cartLength={cart.length}>
      <DashboardLayout>
        <Sidebar>
          {mode === "filters" ? (
            <FiltersPanel
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              category={category}
              setCategory={setCategory}
              onCreateClick={() => setMode("create")}
            />
          ) : (
            <ProductForm
              onSubmit={handleSubmit}
              editingProduct={editingProduct}
              clearEditing={() => {
                setEditingProduct(null);
                setMode("filters");
              }}
            />
          )}

          <CartSidebar
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        </Sidebar>

        <Main>
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ProductsGrid
            products={filteredProducts}
            onDelete={handleDelete}
            onEdit={(product) => {
              setEditingProduct(product);
              setMode("create");
            }}
            onAddToCart={addToCart}
          />
        </Main>
      </DashboardLayout>
    </AppLayout>
  );
};

export default Dashboard;

const DashboardLayout = styled.div`
  display: flex;
  min-height: calc(100vh - 64px);
  background: ${({ theme }) => theme.colors.bg};
`;

const Sidebar = styled.aside`
  width: 340px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  min-width: 0;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 980px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 12px 16px;
  margin-bottom: 20px;
  min-height: 30px;
  border-radius: ${({ theme }) => theme.radii.md};
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.95rem;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
