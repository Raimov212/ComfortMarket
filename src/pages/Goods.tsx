import { useAppSelector } from "../hook";
import { CreateUser, Search } from "../assets/TableIcon";
import { useState } from "react";
import GoodsItem from "../components/Goods/Items";
import { goods } from "../components/Goods/mock";

import { FilterIcon } from "../assets/icons/filter";
import GoodsFilter from "../components/Goods/Filter";

const Goods = () => {
  const [q, setQ] = useState<string>("");
  const [open, setOpen] = useState<Boolean>(false);

  // const goods: any = useAppSelector((state) => state.goods.goods[0]);

  function search(rows: any) {
    return rows.filter((row: any) =>
      columns.some((column: any) => {
        if (row[column] !== null) {
          return (
            row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        }
      })
    );
  }

  const handleFilter = (_: React.MouseEvent<HTMLDivElement>) => {
    setOpen(!open);
  };

  const columns = goods[0] && Object.keys(goods[0]);

  return (
    <div>
      <div className="flex flex-col items-center gap-1 w-[97%] h-full bg-white m-4 ">
        <div className="border-b-2 border-one w-[98%] mt-2 text-2xl text-one">
          Goods
        </div>
        <div className="flex w-[98%] items-center justify-end">
          {/* <div className="flex items-center relative border-2 border-one rounded-md">
            <div className="absolute ml-2 text-lg">
              <Search />
            </div>
            <input
              type="text"
              placeholder="Search here"
              className="pl-8 w-80 h-8 pr-4 outline-none"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div> */}
          <div onClick={handleFilter} className="cursor-pointer ">
            <FilterIcon />
          </div>
          <div className=" cursor-pointer ">
            <CreateUser />
          </div>
          {/* <div className="flex items-center gap-4 rounded-md bg-buttonColor p-3 cursor-pointer">
            
            <div className="text-white">New Goods </div>
          </div> */}
        </div>
        {open && <GoodsFilter />}
        <GoodsItem data={search(goods)} itemsPerPage={0} jumpArr={[]} />
      </div>
    </div>
  );
};

export default Goods;
