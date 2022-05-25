import React from "react";
import Header from "../Header/Index";
import {Container} from "@mui/material";

const PageLayout = ({ children }) => {
  return (
    <>
    <Header />
    <Container maxWidth="xl">
      <div>{children}</div>
    </Container>
    </>
  );
};

export default PageLayout;
