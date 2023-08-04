import React from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { SearchTagsProvider } from "./providers/SearchTags";
import { PatternList, SearchField } from "./components";

import "./App.css";

const useStyles = makeStyles({
  container: {
    marginBottom: "2rem",
    backgroundColor: "white",
  },
});

function App() {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <SearchTagsProvider>
        <SearchField />
        <PatternList />
      </SearchTagsProvider>
    </Container>
  );
}

export default App;
