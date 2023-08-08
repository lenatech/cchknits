import React from "react";
import {
  Autocomplete,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import data from "../api/data.json";
import { useSearchTags } from "../providers/SearchTags";
import { Item as ItemTypes } from "../types";
import { filterBySearchTags } from "../utils/commons";

const useStyles = makeStyles({
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
});

export default function SearchField() {
  const classes = useStyles();
  const { searchTags, handleTagDelete, handleTagAddition, handleClearSearch } =
    useSearchTags();

  const items: ItemTypes[] = data.items;
  const filteredItems = filterBySearchTags(items, searchTags);

  const tagOptions = Array.from(
    new Set(
      items.flatMap(({ materials }) =>
        materials.flatMap(({ name, brand }) => [name, brand])
      )
    )
  ).sort();

  return (
    <div className={classes.searchBarContainer}>
      <div className={classes.searchBar}>
        <Autocomplete
          multiple
          options={tagOptions}
          value={searchTags}
          onChange={(_, value) => handleTagAddition(value)}
          onInputChange={(_, __, reason) => {
            if (reason === "clear") handleClearSearch();
          }}
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
                {...getTagProps({ index })}
                label={tag}
                key={tag}
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
  );
}
