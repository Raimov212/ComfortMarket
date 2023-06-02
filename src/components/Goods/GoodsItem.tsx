import { Fragment } from "react";
import usePagination from "./Pagination";

interface Props {
  data: any;
}

const GoodsItem = ({ data }: Props): JSX.Element => {
  // console.log("goodsItem", data);

  const pageNumbers: number[] = [];
  const PER_PAGE: number = 10;

  const count: number = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  for (let i = 0; i < count; i++) {
    pageNumbers.push(i);
  }

  const handleChange = (_: number, p: number): void => {
    return _DATA.jump(p);
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    return _DATA.prev(e);
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    return _DATA.next(e);
  };

  const newData: string[] | any = _DATA?.currentData();
  const currentPaged: number = _DATA.currentPage;

  return (
    <div className="h-full p-2">
      <table className="w-[98%] mb-2" border={2}>
        <tr>
          <th>No</th>
          <th>Category</th>
          <th>Name</th>
          <th>Count</th>
          <th>Amount</th>
          <th>Article</th>
          <th>Barcode</th>
          <th>Where</th>
          <th>Picture</th>
          <th>Action</th>
        </tr>
        {newData.map((item: any, index: any) => (
          <Fragment key={item.id}>
            <tr key={item.id}>
              <td>{index + currentPaged}</td>
              <td>{item.category}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.amount}</td>
              <td>{item.article}</td>
              <td>{item.barCode}</td>
              <td>{item.wherecome}</td>
              <td>{item.pictureUrl}</td>
              <td>
                <div className="flex items-center justify-center">
                  <p className="text-yellow-400 cursor-pointer">edit</p>
                </div>
              </td>
            </tr>
          </Fragment>
        ))}
      </table>
      <div className="flex gap-2 h-full max-w-96 items-center">
        <button
          onClick={(e) => handlePrev(e)}
          className="bg-secondary h-10 w-16 rounded-2xl text-white"
        >
          prev
        </button>
        <ul className="flex flex-wrap  gap-2 w-full max-h-72 border-2 border-one p-1">
          {pageNumbers.map((page, index) => (
            <li
              className="cursor-pointer"
              onClick={() => handleChange(page, index)}
            >
              {page}
            </li>
          ))}
        </ul>
        <button
          onClick={(e) => handleNext(e)}
          className="bg-primary h-10 w-16 rounded-2xl text-white"
        >
          next
        </button>
      </div>
    </div>
  );
};

export default GoodsItem;
