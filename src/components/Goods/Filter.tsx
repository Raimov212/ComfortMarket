import { useState, useCallback } from "react";
import { FilterProps } from "./filterType";

const GoodsFilter: React.FC<FilterProps> = ({
  filterData,
  setSearchArrItemCategory,
  setSearchText,
}): JSX.Element => {
  const [filterInput, setFilterInput] = useState({
    category: "",
    name: "",
    amount: "",
    article: "",
    barCode: "",
    wherecome: "",
  });
  console.log("filterData", filterData);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterInput({ ...filterInput, [e.target.name]: e.target.value });
      setSearchArrItemCategory([e.target.name]);
      setSearchText(e.target.value);
    },
    [filterInput]
  );

  return (
    <div className="flex gap-1">
      <input
        type="text"
        name="category"
        className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
        placeholder="Category"
        value={filterInput.category}
        autoComplete="on"
        list="categoryId"
        onChange={handleInputChange}
      />
      <datalist id="categoryId">
        {filterData?.categoryFilter?.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </datalist>
      <input
        type="text"
        name="name"
        className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
        placeholder="Name"
        value={filterInput.name}
        autoComplete="on"
        list="nameId"
        onChange={handleInputChange}
      />
      <datalist id="nameId">
        {filterData?.nameFilter?.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </datalist>
      <input
        type="text"
        name="amount"
        className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
        placeholder="Amount"
        value={filterInput.amount}
        autoComplete="on"
        list="amountId"
        onChange={handleInputChange}
      />
      <datalist id="amountId">
        {filterData?.amountFilter?.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </datalist>
      <input
        type="text"
        name="article"
        className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
        placeholder="Article"
        value={filterInput.article}
        autoComplete="on"
        list="articleId"
        onChange={handleInputChange}
      />
      <datalist id="articleId">
        {filterData?.articleFilter?.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </datalist>
      <input
        type="text"
        name="barCode"
        className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
        placeholder="BarCode"
        value={filterInput.barCode}
        autoComplete="on"
        list="barCodeId"
        onChange={handleInputChange}
      />
      <datalist id="barCodeId">
        {filterData?.barCodeFilter?.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </datalist>
      <input
        type="text"
        name="wherecome"
        className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
        placeholder="Wherecome"
        value={filterInput.wherecome}
        autoComplete="on"
        list="wherecomeId"
        onChange={handleInputChange}
      />
      <datalist id="wherecomeId">
        {filterData?.wherecomeFilter?.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </datalist>
    </div>
  );
};

export default GoodsFilter;
