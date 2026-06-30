import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ onSubmit, editingProduct, clearEditing }) => {
  const isEdit = Boolean(editingProduct);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setStock(editingProduct.stock);
      setCategory(editingProduct.category);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      navigate("/auth");
      return;
    }

    const productData = {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
    };

    try {
      await onSubmit(productData);
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
    } catch (err) {
      console.error("Product save failed", err);
      if (err.status === 401) {
        navigate("/auth");
      }
    }
  };

  return (
    <StyledWrapper>
      <Title>{isEdit ? "Edit Product" : "New Product"}</Title>

      <Form onSubmit={handleSubmit}>
        <Inputs>
          <Field
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Field
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Field
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <Field
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Field
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </Inputs>

        <SubmitBtn type="submit">
          {isEdit ? "Update Product" : "Add Product"}
        </SubmitBtn>

        <BackBtn type="button" onClick={clearEditing}>
          Back to filters
        </BackBtn>
      </Form>
    </StyledWrapper>
  );
};

export default ProductForm;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Field = styled.input`
  background: ${({ theme }) => theme.colors.inputBg};
  border: none;
  outline: none;
  height: 42px;
  width: 100%;
  padding: 0 14px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:focus {
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.borderFocus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SubmitBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const BackBtn = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;
