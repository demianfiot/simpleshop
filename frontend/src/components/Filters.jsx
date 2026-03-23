import { useState } from "react";
import styled from "styled-components";

const Filters = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  category,
  setCategory,
  onCreateClick,
}) => {
  return (
    <StyledWrapper>
      <div className="form-box">
        <div className="form">
          <span className="title">Filters</span>

          <div className="form-container">
            <input
              type="number"
              placeholder="Min price"
              className="input"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Max price"
              className="input"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            <input
              type="text"
              placeholder="Category"
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button onClick={onCreateClick}>
            Add your product
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Filters;
const StyledWrapper = styled.div`
  .form-box {
    max-width: 100%;
    background: #f1f7fe;
    color: #010101;
  }

  .form {
    display: flex;
    flex-direction: column;
    padding: 24px 20px;
    gap: 14px;
    text-align: center;
  }

  .title {
    font-weight: bold;
    font-size: 1.5rem;
  }

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
    font-size: 0.9rem;
    padding: 8px 12px;
  }

  button {
    background-color: #1f78ff;
    color: #fff;
    border: 0;
    border-radius: 12px;
    padding: 9px 14px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
  }

  button:hover {
    background-color: #4f95ff;
  }
`;