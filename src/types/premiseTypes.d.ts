import { Key } from "react";

export interface AllProductType {
  id: number;
  name: string;
  barcode: string;
  createdAt: string;
  count: number;
  price: number;
  url?: string;
  category: string;
  addedBy: string;
}

export interface CreatePremiseToProductType {
  name: string;
  barcode: string;
  count: number | null;
  price: number | null;
  categoryId: number | null;
}

export interface CreatePremiseType {
  name: string;
  address: string;
  type: string;
}

//premise table data type

export interface ExtraPremiseProductsType {
  premise: string;
  count: number | null;
}

export interface WorkersProductsType {
  id: number;
  fullName: string;
  phoneNumber: string;
  role: string;
  username: string;
  enabled: boolean;
  premise: [string];
}

export interface DataType {
  key: Key;
  id: number;
  name: string;
  address: string;
  owner: string;
  type: string;
  products: PremiseProductsType[];
  workers: WorkersProductsType[];
}
