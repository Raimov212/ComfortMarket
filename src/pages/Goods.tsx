import { useAppSelector } from "../hook";
import { CreateUser, Search } from "../assets/TableIcon";
import { useState } from "react";
import GoodsItem from "../components/Goods/GoodsItem";

const Goods = () => {
  const [q, setQ] = useState<string>("");

  const goods: any = useAppSelector((state) => state.goods.goods[0]);
  console.log("goods", goods);

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

  const columns = goods[0] && Object.keys(goods[0]);

  return (
    <div>
      <div className="flex flex-col items-center gap-2 w-[97%] h-full bg-white m-4 ">
        <div className="border-b-2 border-one w-[98%] mt-2 text-2xl text-one">
          Goods
        </div>
        <div className="flex mt-2 w-[98%] justify-between">
          <div className="flex items-center relative border-2 border-one rounded-md">
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
          </div>
          <div className="flex items-center gap-4 rounded-md bg-buttonColor p-3 cursor-pointer">
            <CreateUser />
            <div className="text-white">New Goods </div>
          </div>
        </div>

        <GoodsItem data={search(goods)} />
        {/* <table className="w-[98%] mb-2" border={2}>
          <tr>
            <th>No</th>
            <th>Category</th>
            <th>Name</th>
            <th>Count</th>
            <th>Amount</th>
            <th>Article</th>
            <th>Barcode</th>
            <th>WhereId</th>
            <th>Picture</th>
            <th>Action</th>
          </tr>

          {goods?.map((item: any, index: number) => (
            <>
              <tbody>
                <tr>
                  <td key={item.id}>{index + 1}</td>
                  <td>{item.category}</td>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>{item.amount}</td>
                  <td>{item.article}</td>
                  <td>{item.barCode}</td>
                  <td>{item.whereId}</td>
                  <td>{item.pictureUrl}</td>
                  <td>
                    <div className="flex gap-2 items-center justify-center">
                      <p className="border-r-2 border-one pr-2  text-yellow-400 cursor-pointer">
                        edit
                      </p>
                      <p className="text-red-600 cursor-pointer">delete</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table> */}
      </div>
    </div>
  );
};

export default Goods;
