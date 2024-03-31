export interface PremiseProducts {
  name: string;
  barcode: string;
  count: number | null;
  price: number | null;
  categoryId: number;
}

export interface PremiseProductsCategoryDataTypes {
  id: number;
  name: string;
  productsCount: number | null;
}

export interface TransferProductType {
  previousId: number;
  destinationId: number;
  count: string;
}
