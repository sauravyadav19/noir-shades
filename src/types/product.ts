export interface ProductAngle {
  label: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  type: string;
  price: string;
  angles: ProductAngle[];
}

export interface ProductsData {
  products: Product[];
}
