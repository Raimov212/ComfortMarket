import { useAppSelector } from "../hook";
import { CreateUser } from "../assets/TableIcon";
import { useState } from "react";
import GoodsItem from "../components/Goods/Items";
// import { allDataGoods } from "../components/Goods/mock";

import { FilterIcon } from "../assets/icons/filter";
import GoodsFilter from "../components/Goods/Filter";
import { AllData, GoodsProps } from "../components/Goods/goods";

const Goods = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [open, setOpen] = useState<Boolean>(false);
  const [searchArrItemCategory, setSearchArrItemCategory] =
    useState<string[]>();

  // const goods = allDataGoods as AllData[];

  const allData = useAppSelector((state) => state.goods.goods[0]);
  const goods = allData as unknown as AllData[];

  const filterData: GoodsProps = {
    categoryFilter: [...new Set(goods?.map((n) => n.category))],
    nameFilter: [...new Set(goods?.map((n) => n.name))],
    amountFilter: [...new Set(goods?.map((n) => n.amount))],
    articleFilter: [...new Set(goods?.map((n) => n.article))],
    barCodeFilter: [...new Set(goods?.map((n) => n.barCode))],
    wherecomeFilter: [...new Set(goods?.map((n) => n.wherecome))],
  };

  function search(rows: AllData[]) {
    return rows.filter((row: AllData) =>
      searchArrItemCategory?.some((item) => {
        if (row[item] !== null) {
          return (
            row[item]
              .toString()
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) > -1
          );
        }
      })
    );
  }

  const handleFilter = (_: React.MouseEvent<HTMLDivElement>) => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-1 w-[97%] h-full bg-white m-4 ">
        <div className="border-b-2 border-one w-[98%] mt-2 text-2xl text-one">
          Goods
        </div>
        <div className="flex w-[98%] items-center justify-end">
          <div onClick={handleFilter} className="cursor-pointer ">
            <FilterIcon />
          </div>
          <div className=" cursor-pointer ">
            <CreateUser />
          </div>
        </div>
        {open && (
          <GoodsFilter
            filterData={filterData}
            setSearchArrItemCategory={setSearchArrItemCategory}
            setSearchText={setSearchText}
          />
        )}
        <GoodsItem
          data={searchText !== "" ? search(goods) : goods}
          itemsPerPage={0}
        />
      </div>
    </div>
  );
};

export default Goods;
