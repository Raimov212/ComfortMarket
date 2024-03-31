import usePagination from "./Pagination";
import {
  OneLeftAngle,
  OneRightAngle,
  TwoLeftAngle,
  TwoRightAngle,
} from "../../assets/icons1/paginationIcon";
import { AllData, Data } from "./goods";
import { useTranslation } from "react-i18next";
import { FC } from "react";

const GoodsItem: FC<Data> = ({
  data,
  setEditGoodsInput,
  setOpenEditGoods,
}): JSX.Element => {
  const itemsPerPage: number = 10;
  const jumpArr: number[] = [];

  const { t } = useTranslation();

  // const count: number = Math.ceil(data.length / itemsPerPage);
  const _DATA = usePagination({ data, itemsPerPage });

  const newData: AllData[] = _DATA?.currentData();
  const currentPaged = _DATA.currentPage;

  for (let i = currentPaged; i < currentPaged + 10; i++) {
    jumpArr.push(i);
  }

  const handleChange = (p: number) => {
    return jumpArr[0] !== 1 && jumpArr[0] === p
      ? _DATA.jump(currentPaged - 10)
      : _DATA.jump(p);
  };

  const handlePrev = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    _DATA.prev(e);

  const handleNext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    _DATA.next(e);

  const handleFirstPage = (e: React.MouseEvent<HTMLDivElement>) =>
    _DATA.firstPage(e);

  const handleLastPage = (e: React.MouseEvent<HTMLDivElement>) =>
    _DATA.lastPage(e);

  return (
    <div className="h-full w-full">
      <table className="table">
        <thead>
          <tr className="bg-base-200">
            <th>No</th>
            <th>Category</th>
            <th>Name</th>
            <th>Count</th>
            <th>Price</th>
            {/* <th>Article</th> */}
            <th>Barcode</th>
            {/* <th>Where</th> */}
            <th>Picture</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {newData?.map((item, index) => (
            <tr key={item.id}>
              <td>
                {(currentPaged === 1 ? currentPaged : currentPaged * 10) +
                  index}
              </td>
              <td>{item.category}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.price}</td>
              {/* <td>{item.article}</td> */}
              <td>{item.barcode}</td>
              {/* <td>{item.wherecome}</td> */}
              <td>
                <img src={item.url} className="w-12 h-12 object-cover" />
              </td>
              <td>
                <button
                  onClick={() => {
                    setOpenEditGoods(true),
                      setEditGoodsInput((prev) => ({
                        ...prev,
                        id: item.id,
                        article: item.article,
                        name: item.name,
                        barCode: item.barCode,
                        // pictureUrl: item.pictureUrl,
                        whereId: item.whereId,
                        categoryId: item.categoryId,
                      }));
                  }}
                  className="btn btn-square"
                >
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between p-2">
        <div>
          <div className="text-base-200 flex items-center gap-1">
            <div className="font-normal">{t("goods.currentGoodsValue")}:</div>
            <div className="font-medium">{data?.length}</div>
          </div>
        </div>
        <div className="flex gap-2 h-full max-w-96 items-center">
          <div onClick={(e) => handleFirstPage(e)} className="cursor-pointer">
            <TwoLeftAngle />
          </div>
          <div onClick={(e) => handlePrev(e)} className="cursor-pointer">
            <OneLeftAngle />
          </div>
          <ul className="flex flex-wrap  gap-2">
            {jumpArr?.map((page) => (
              <li
                key={page}
                className="cursor-pointer"
                onClick={() => handleChange(page)}
              >
                {page}
              </li>
            ))}
          </ul>
          <div onClick={(e) => handleNext(e)} className="cursor-pointer">
            <OneRightAngle />
          </div>
          <div onClick={(e) => handleLastPage(e)} className="cursor-pointer">
            <TwoRightAngle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsItem;
