import usePagination from "./Pagination";
import {
  OneLeftAngle,
  OneRightAngle,
  TwoLeftAngle,
  TwoRightAngle,
} from "../../assets/icons/paginationIcon";
import { AllData, Data } from "./goods";
import { useTranslation } from "react-i18next";

const GoodsItem: React.FC<Data> = ({ data }): JSX.Element => {
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
      <table>
        <thead>
          <tr className="hover:scale-100 bg-primary text-white hover:bg-primary hover:shadow-none">
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
              <td>{item.amount}</td>
              <td>{item.article}</td>
              <td>{item.barCode}</td>
              <td>{item.wherecome}</td>
              <td>{item.pictureUrl}</td>
              <td>
                <div className="flex items-center justify-center">
                  <p className="text-[#FF6B55] cursor-pointer">edit</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between p-2">
        <div>
          <div className="text-primary flex items-center gap-1">
            <div className="font-normal">{t("goods.currentGoodsValue")}:</div>
            <div className="font-medium">{data.length}</div>
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
