import { useState, useCallback } from "react";

const GoodsFilter = () => {
  const [filterInput, setFilterInput] = useState({
    category: "",
    name: "",
    amount: "",
    article: "",
    barCode: "",
    wherecome: "",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterInput({ ...filterInput, [e.target.name]: e.target.value });
    },
    [filterInput]
  );

  return (
    <div>
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
    </div>
  );
};

export default GoodsFilter;
