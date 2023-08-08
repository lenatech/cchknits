import { Item as ItemTypes, SearchTags } from "../types";

export const filterBySearchTags = (
  items: ItemTypes[],
  searchTags: SearchTags,
  needles: string[]
) => {
  const shouldIncludeItem = ({ materials, needle_sizes }: ItemTypes) => {
    if (searchTags.length === 0 && needles.length === 0) {
      return true;
    }

    if (searchTags.length === 0 && needles.length !== 0) {
      return needles.some((needle) => needle_sizes.includes(needle));
    }

    const hasMatchingTags = materials.some(
      ({ name, brand }) =>
        searchTags.includes(name) || searchTags.includes(brand)
    );

    const needlesSubset =
      needles.length === 0 ||
      !needles.some((needle) => !needle_sizes.includes(needle));

    return hasMatchingTags && needlesSubset;
  };

  return items
    .filter(shouldIncludeItem)
    .sort((a, b) => a.name.localeCompare(b.name));
};
