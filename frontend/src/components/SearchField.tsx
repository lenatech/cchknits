import React from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  Checkbox,
  Chip,
  TextField,
  Typography,
} from "@mui/material";

import data from "../api/data.json";
import { useSearchTags } from "../providers/SearchTags";
import { Item as ItemTypes } from "../types";
import { filterBySearchTags } from "../utils/commons";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SearchField() {
  const {
    searchTags,
    handleTagDelete,
    handleTagAddition,
    handleClearSearch,
    needles,
    setNeedleSizes,
  } = useSearchTags();

  const items: ItemTypes[] = data.items;
  const filteredItems = filterBySearchTags(items, searchTags, needles);

  const tagOptions = Array.from(
    new Set(
      filteredItems.flatMap(({ materials }) =>
        materials.flatMap(({ name, brand }) => [name, brand])
      )
    )
  ).sort();

  const needleOptions = Array.from(
    new Set(filteredItems.flatMap(({ needle_sizes }) => needle_sizes))
  ).sort((a, b) => Number(a) - Number(b));

  return (
    <div
      style={{
        paddingTop: "2rem",
        paddingBottom: "1rem",
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 1,
        marginBottom: "1rem",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
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
                sx={{ marginRight: "0.5rem" }}
                onDelete={() => handleTagDelete(tag)}
              />
            ))
          }
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <Autocomplete
          multiple
          options={needleOptions}
          value={needles}
          onChange={(_, value) =>
            setNeedleSizes((prevTags) =>
              Array.from(new Set([...prevTags, ...value]))
            )
          }
          onInputChange={(_, __, reason) => {
            if (reason === "clear") setNeedleSizes([]);
          }}
          getOptionLabel={(option) => `${option} mm`}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              {...params}
              variant="outlined"
              label="Needle Sizes"
              placeholder={searchTags.length === 0 ? "Needle Sizes" : ""}
              fullWidth
            />
          )}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {`${option} mm`}
            </li>
          )}
          renderTags={(
            value: string[],
            getTagProps: AutocompleteRenderGetTagProps
          ) =>
            value.map((currentTag, index) => (
              <Chip
                {...getTagProps({ index })}
                label={`${currentTag} mm`}
                key={currentTag}
                sx={{ marginRight: "0.5rem" }}
                onDelete={() =>
                  setNeedleSizes((prevTags) =>
                    prevTags.filter((tag) => tag !== currentTag)
                  )
                }
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
