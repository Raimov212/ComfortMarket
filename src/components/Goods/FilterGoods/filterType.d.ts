import { AllData, GoodsProps } from "../goods";
import { Dispatch, SetStateAction } from "react";

export type FilterProps = {
  goods: AllData[];
  setSearchArrItemCategory: Dispatch<SetStateAction<string[] | undefined>>;
  setSearchText: Dispatch<React.SetStateAction<string>>;
};
