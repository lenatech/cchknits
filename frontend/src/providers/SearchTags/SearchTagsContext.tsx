/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext } from "react";

// Define the context
interface SearchTagsContextValue {
  needles: string[];
  searchTags: string[];
  setNeedleSizes: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleTagDelete: (tagToDelete: string) => void;
  handleTagAddition: (tagToAdd: string[]) => void;
  handleClearSearch: () => void;
}

export const SearchTagsContext = createContext<SearchTagsContextValue>({
  searchTags: [],
  setNeedleSizes: () => {},
  setSearchTags: () => {},
  handleTagDelete: () => {},
  handleTagAddition: () => {},
  handleClearSearch: () => {},
  needles: [],
});

export const useSearchTags = () => useContext(SearchTagsContext);
