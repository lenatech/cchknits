import React, { ReactNode, useState } from "react";

import { SearchTagsContext } from "./SearchTagsContext";

interface SearchTagsProviderProps {
  children: ReactNode;
}

export const SearchTagsProvider: React.FC<SearchTagsProviderProps> = ({
  children,
}) => {
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const handleTagDelete = (tagToDelete: string) => {
    setSearchTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleTagAddition = (tagToAdd: string[]) => {
    setSearchTags((prevTags) => [...prevTags, ...tagToAdd]);
  };

  const handleClearSearch = () => {
    setSearchTags([]);
  };

  return (
    <SearchTagsContext.Provider
      value={{
        searchTags,
        setSearchTags,
        handleTagDelete,
        handleTagAddition,
        handleClearSearch,
      }}
    >
      {children}
    </SearchTagsContext.Provider>
  );
};
