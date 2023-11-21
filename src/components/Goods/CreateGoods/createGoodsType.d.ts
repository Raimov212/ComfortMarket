import { GoodsProps } from "../goods";
import { Dispatch, SetStateAction } from "react";

export interface GoodsCategoryAndWhereIdType {
  [key: string]: string;
  id: string;
  name: string;
}

export type CreateGoodsTypeData = {
  userId: string;
  pUserId: string;
  categoryId: string;
  name: string;
  amount: string;
  count: string;
  article: string;
  barCode: string;
  whereId: string;
  premiseId: string;
};

export type CreateGoodsType = {
  setOpenCreateGoodsProps: Dispatch<SetStateAction<Boolean>>;
};
