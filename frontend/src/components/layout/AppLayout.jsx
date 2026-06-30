import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const AppLayout = ({ children, cartLength }) => {
  return (
    <StyledLayout>
      <Header />
      <Main>{children}</Main>
      <Footer length={cartLength} />
    </StyledLayout>
  );
};

export default AppLayout;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  margin-top: 64px;
`;
