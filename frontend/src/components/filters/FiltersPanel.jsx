import styled from "styled-components";

const FiltersPanel = ({
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
      <Title>Filters</Title>

      <Inputs>
        <Input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Inputs>

      <AddBtn onClick={onCreateClick}>+ Add Product</AddBtn>
    </StyledWrapper>
  );
};

export default FiltersPanel;

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

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Input = styled.input`
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

const AddBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 11px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;
