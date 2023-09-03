import { useAppSelector } from "../hook";
import { CreateUser } from "../assets/icons/TableIcon";
import { useState } from "react";
import GoodsItem from "../components/Goods/Items";
// import { allDataGoods } from "../components/Goods/mock";

import { FilterIcon } from "../assets/icons/filter";
import GoodsFilter from "../components/Goods/FilterGoods/Filter";
import { AllData, GoodsProps } from "../components/Goods/goods";
import CreateGoods from "../components/Goods/CreateGoods/createGoods";

const Goods = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [openFilter, setOpenFilter] = useState<Boolean>(false);
  const [openCreateGoods, setOpenCreateGoods] = useState<Boolean>(false);
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

  // useEffect(() => {
  //   if (searchText) return;

  //   return () => {
  //     setSearchText("");
  //   };
  // }, [searchText]);

  console.log("searchText", searchText);

  const handleFilter = (_: React.MouseEvent<HTMLDivElement>) => {
    if (openCreateGoods) {
      setOpenCreateGoods(!openCreateGoods);
    }
    setOpenFilter(!openFilter);
  };

  const handleCreateGoods = (_: React.MouseEvent<HTMLDivElement>) => {
    if (openFilter) {
      setOpenFilter(!openFilter);
    }
    setOpenCreateGoods(!openCreateGoods);
  };

  return (
    <div className="flex flex-col box-border p-2 gap-1 w-[99%] h-full bg-white m-2 ">
      <div className="border-b-2 border-one w-[98%] mt-2 text-2xl text-one">
        Goods
      </div>
      <div className="flex w-full pr-6 items-center justify-end">
        <div onClick={handleFilter} className="cursor-pointer ">
          <FilterIcon />
        </div>
        <div onClick={handleCreateGoods} className=" cursor-pointer ">
          <CreateUser />
        </div>
      </div>
      {openFilter && (
        <GoodsFilter
          filterData={filterData}
          setSearchArrItemCategory={setSearchArrItemCategory}
          setSearchText={setSearchText}
        />
      )}
      {openCreateGoods && (
        <CreateGoods setOpenCreateGoodsProps={setOpenCreateGoods} />
      )}
      <GoodsItem
        data={searchText !== "" ? search(goods) : goods}
        itemsPerPage={0}
      />
    </div>
  );
};

export default Goods;
