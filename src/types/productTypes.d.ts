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
