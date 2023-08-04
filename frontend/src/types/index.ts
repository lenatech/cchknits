export interface Material {
  name: string;
  brand: string;
}

export interface Item {
  id: number;
  name: string;
  link: string;
  collection: string; //TODO: make it list
  materials: Material[];
  materials_desc: string;
  imgSrc: string;
}

export type SearchTags = string[];
