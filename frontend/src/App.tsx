import React, { useState, useRef, useEffect } from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  AutocompleteRenderGetTagProps,
  Chip,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import { Item as ItemTypes } from "./types";
import data from "./api/data.json";
import "./App.css";
import { makeStyles } from "@mui/styles";
import ComplexGrid from "./components/Card";

const useStyles = makeStyles({
  container: {
    marginBottom: "2rem",
    backgroundColor: "white",
  },
  searchBarContainer: {
    paddingTop: "2rem",
    paddingBottom: "1rem",
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    zIndex: 1,
    marginBottom: "1rem",
  },
  searchBar: {
    marginBottom: "1rem",
  },
  tag: {
    marginRight: "0.5rem",
  },
  scrollableContent: {
    overflowY: "auto",
    "& > *": {
      marginBottom: "0.25rem",
    },
  },
});

function App() {
  const classes = useStyles();
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  const items: ItemTypes[] = data.items;

  useEffect(() => {
    const resizeHandler = () => {
      if (scrollableContentRef.current) {
        const searchBarHeight =
          scrollableContentRef.current.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        const scrollableContentHeight = windowHeight - searchBarHeight;
        scrollableContentRef.current.style.height = `${scrollableContentHeight}px`;
      }
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    }
  }, [searchTags]);

  const handleTagDelete = (tagToDelete: string) => {
    setSearchTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const tagOptions = Array.from(
    new Set(
      items.flatMap(({ materials }) =>
        materials.flatMap(({ name, brand }) => [name, brand])
      )
    )
  ).sort();

  const filteredItems = items.filter(({ materials }) => {
    if (searchTags.length === 0) return true;
    return materials.some(
      ({ name, brand }) =>
        searchTags.includes(name) || searchTags.includes(brand)
    );
  });

  return (
    <Container maxWidth="sm" className={classes.container}>
      <div className={classes.searchBarContainer}>
        <div className={classes.searchBar}>
          <Autocomplete
            multiple
            options={tagOptions}
            value={searchTags}
            onChange={(_, value) => setSearchTags(value)}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField
                {...params}
                variant="outlined"
                label="Search Yarns / Producer"
                placeholder={
                  searchTags.length === 0 ? "Search Yarns / Producer" : ""
                }
                fullWidth
              />
            )}
            renderTags={(
              value: string[],
              getTagProps: AutocompleteRenderGetTagProps
            ) =>
              value.map((tag, index) => (
                <Chip
                  label={tag}
                  {...getTagProps({ index })}
                  className={classes.tag}
                  onDelete={() => handleTagDelete(tag)}
                />
              ))
            }
          />
        </div>
        <Typography variant="h6" align="center">
          {filteredItems.length} results.
        </Typography>
      </div>

      <div ref={scrollableContentRef} className={classes.scrollableContent}>
        {filteredItems.map((filteredItem, index) => (
          <ComplexGrid
            key={index}
            item={filteredItem}
            searchTags={searchTags}
          />
        ))}
      </div>
    </Container>
  );
}

export default App;
