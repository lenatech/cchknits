import { Item as ItemTypes, SearchTags } from "../types";

export const filterBySearchTags = (
  items: ItemTypes[],
  searchTags: SearchTags
) => {
  return items
    .filter(({ materials }) => {
      if (searchTags.length === 0) {
        return true;
      }
      return materials.some(
        ({ name, brand }) =>
          searchTags.includes(name) || searchTags.includes(brand)
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};
