import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ onSubmit, editingProduct, clearEditing }) => {
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
      category
    };

    try {
      await onSubmit(productData);

      // очищаємо форму тільки якщо створення пройшло успішно
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");

    } catch (err) {
      console.error("Create product failed", err);

      // якщо сервер 401 —  редірект
      if (err.status === 401) {
        navigate("/auth");
      }
    }
  };

  return (
    <StyledWrapper>
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">
            {isEdit ? "Edit Product" : "New Product"}
          </span>

          <div className="form-container">
            <input
              type="text"
              placeholder="Product name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Category"
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Stock"
              className="input"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            {isEdit ? "Update Product" : "Add product"}
          </button>
          <button
            type="button"
            onClick={clearEditing}
            className="cancel-btn"
          >
            Back to filters
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={clearEditing}
              style={{ marginTop: "10px", background: "#ccc" }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-box {
    max-width: 100%;        
    background: #f1f7fe;
    color: #010101;
    padding: 0;
  }

  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 24px 20px;
    gap: 14px;
    text-align: center;
  }

  /* Form text */
  .title {
    font-weight: bold;
    font-size: 1.5rem;  
  }

  /* Inputs box */
  .form-container {
    border-radius: 8px;
    background-color: #fff;
    margin: 0.8rem 0 0.4rem;
    width: 100%;
  }

  .input {
    background: none;
    border: 0;
    outline: 0;
    height: 38px;        
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: .9rem;
    padding: 8px 12px;
  }

  .form button {
    background-color: #1f78ff;
    color: #fff;
    border: 0;
    border-radius: 12px;
    padding: 9px 14px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color .3s ease;
  }

  .form button:hover {
    background-color: #4f95ff;
  }
  .cancel-btn {
    margin-top: 10px;
    background: #ccc !important;
    color: #333;
}
  .cancel-btn:hover {
    background-color: #222222;
  }
`;
export default AddProduct;