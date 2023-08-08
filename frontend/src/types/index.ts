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
  gauge: {
    sts: number;
    rows: number;
    needle_size: number;
  };
  needle_sizes: string[];
}

export type SearchTags = string[];
