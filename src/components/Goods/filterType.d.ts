import { GoodsProps } from "./goods";

export type FilterProps = {
  filterData: GoodsProps;
  setSearchArrItemCategory: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};
