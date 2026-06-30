import React from "react";
import styled from "styled-components";

const Footer = ({ length }) => {
  const year = new Date().getFullYear();
  return (
    <StyledFooter>
      <span>Simpleshop</span>
      <span>
        Total {length} {length === 1 ? "item" : "items"}
      </span>
      <span>&copy; {year}</span>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 30px;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;
