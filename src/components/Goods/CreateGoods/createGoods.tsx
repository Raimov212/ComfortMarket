import { useState, useCallback, useEffect } from "react";
import { CreateGoodsType } from "./createGoodsType";
import { getGoodsApi } from "../../../api/goodsApi";
import { useAppSelector } from "../../../hook";

const CreateGoods: React.FC<CreateGoodsType> = ({
  setOpenCreateGoodsProps,
}): JSX.Element => {
  const userID = useAppSelector((state) => state.user.userData[0].userId);
  const parentID = useAppSelector((state) => state.user.userData[0].parentId);
  const [createGoodsInput, setCreateGoodsInput] = useState({
    userId: userID,
    pUserId: parentID,
    categoryId: "",
    name: "",
    amount: "",
    article: "",
    barCode: "",
    whereId: "",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreateGoodsInput({
        ...createGoodsInput,
        [e.target.name]: e.target.value,
      });
    },
    [createGoodsInput]
  );

  useEffect(() => {
    const handleKeydown = (event: { key: string | undefined }) => {
      if (event.key == undefined) {
        return;
      } else if (event.key === "Escape") {
        setOpenCreateGoodsProps((prev) => !prev);
      } else {
        return;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const createGoodsForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOpenCreateGoodsProps((prev) => !prev);
    const addToBaseGoods = await getGoodsApi.post(
      "/goodsAddToBase.php",
      createGoodsInput
    );
    console.log("addToBaseGoods", addToBaseGoods);

    // console.log(createGoodsInput);
  };

  return (
    <div className=" fixed top-10 left-[25%] bg-primary w-[100vh] h-[80vh] overflow-hidden z-10 rounded-xl">
      <div className="p-4 text-white">Create Goods</div>
      <form
        onSubmit={createGoodsForm}
        className="flex flex-col gap-4 items-center pt-10"
      >
        <input
          type="text"
          name="categoryId"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
          placeholder="Category"
          value={createGoodsInput.categoryId}
          autoComplete="on"
          list="categoryId"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
          placeholder="Name"
          value={createGoodsInput.name}
          autoComplete="on"
          list="nameId"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="amount"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
          placeholder="Amount"
          value={createGoodsInput.amount}
          autoComplete="on"
          list="amountId"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="article"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
          placeholder="Article"
          value={createGoodsInput.article}
          autoComplete="on"
          list="articleId"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="barCode"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
          placeholder="BarCode"
          value={createGoodsInput.barCode}
          autoComplete="on"
          list="barCodeId"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="whereId"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary"
          placeholder="Wherecome"
          value={createGoodsInput.whereId}
          autoComplete="on"
          list="wherecomeId"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="rounded-md border-2 py-2 px-11 border-primary text-primary bg-white transition ease-in hover:text-white hover:bg-secondary"
        >
          Create Goods
        </button>
      </form>
    </div>
  );
};

export default CreateGoods;
