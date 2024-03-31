import { Dispatch, SetStateAction } from "react";
import { EditGoodsTypeData } from "./EditGoods/editgoodsType";

export type AllData = {
  [key: string]: string;
  amount: string;
  article: string;
  barCode: string;
  category: string;
  categoryId: string;
  count: string;
  id: string;
  name: string;
  pictureUrl: null;
  shopId: string;
  whereId: string;
  wherecome: string;
};

export type PaginationType = {
  data: AllData[];
  itemsPerPage: number;
};

export type Data = {
  data: AllData[];
  itemsPerPage: number;
  setEditGoodsInput: Dispatch<SetStateAction<EditGoodsTypeData>>;
  setOpenEditGoods: Dispatch<SetStateAction<Boolean>>;
};

export type GoodsProps = {
  [key: string]: string[];
  categoryFilter: string[] | null;
  nameFilter: string[] | null;
  amountFilter: string[] | null;
  articleFilter: string[] | null;
  barCodeFilter: string[] | null;
  wherecomeFilter: string[] | null;
};

export interface AllGoods {
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
