/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext } from "react";

// Define the context
interface SearchTagsContextValue {
  searchTags: string[];
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleTagDelete: (tagToDelete: string) => void;
  handleTagAddition: (tagToAdd: string[]) => void;
  handleClearSearch: () => void;
}

export const SearchTagsContext = createContext<SearchTagsContextValue>({
  searchTags: [],
  setSearchTags: () => {},
  handleTagDelete: () => {},
  handleTagAddition: () => {},
  handleClearSearch: () => {},
});

export const useSearchTags = () => useContext(SearchTagsContext);
