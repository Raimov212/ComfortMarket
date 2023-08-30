import { GoodsProps } from "../goods";
import { Dispatch, SetStateAction } from "react";

export type CreateGoodsType = {
  setOpenCreateGoodsProps: Dispatch<SetStateAction<Boolean>>;
};
