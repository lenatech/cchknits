import React from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/system";

import { SearchTagsProvider } from "./providers/SearchTags";
import { PatternList, SearchField } from "./components";

import "./App.css";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginBottom: "2rem",
  backgroundColor: "white",
}));

function App() {
  return (
    <StyledContainer maxWidth="sm">
      <SearchTagsProvider>
        <SearchField />
        <PatternList />
      </SearchTagsProvider>
    </StyledContainer>
  );
}

export default App;
