export interface ExtraPremiseProductsType {
  count: number | null;
  premise: string;
}

export interface ProductsDataType {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  category: string;
  barcode: string;
  addedBy: string;
  extra: ExtraPremiseProductsType[];
}

export interface ProductInfoType {
  id: number;
  name: string;
  barcode: string;
  category: string;
  producer: string;
}
