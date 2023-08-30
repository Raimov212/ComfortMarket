import { GoodsProps } from "../goods";
import { Dispatch, SetStateAction } from "react";

export type FilterProps = {
  filterData: GoodsProps;
  setSearchArrItemCategory: Dispatch<SetStateAction<string[] | undefined>>;
  setSearchText: Dispatch<React.SetStateAction<string>>;
};
