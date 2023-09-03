import { useState, useCallback, useEffect } from "react";
import { CreateGoodsType } from "./createGoodsType";
import { getGoodsApi } from "../../../api/goodsApi";
import { useAppSelector } from "../../../hook";
import { t } from "i18next";
import { ToastContainer, toast } from "react-toastify";
import { AxiosResponse } from "axios";

interface GoodsCategoryAndWhereIdType {
  [key: string]: string;
  id: string;
  name: string;
}

const CreateGoods: React.FC<CreateGoodsType> = ({
  setOpenCreateGoodsProps,
}): JSX.Element => {
  const userID = useAppSelector((state) => state.user.userData[0].userId);
  const parentID = useAppSelector((state) => state.user.userData[0].parentId);
  const goodsCategory = useAppSelector((state) => state.goods.goodsCategory[0]);
  const goodsLocation = useAppSelector((state) => state.goods.goodsLocation[0]);

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

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateGoodsInput({
      ...createGoodsInput,
      categoryId: e.target.value,
    });
  };

  const handleSelectWhereCome = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateGoodsInput({
      ...createGoodsInput,
      whereId: e.target.value,
    });
  };

  console.log("createGoodsInput", createGoodsInput);

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
    if (createGoodsInput.categoryId === "") {
      return toast.error(t("goods.createPremiseError.category"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (createGoodsInput.name === "") {
      return toast.error(t("goods.createPremiseError.name"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (createGoodsInput.amount === "") {
      return toast.error(t("goods.createPremiseError.amount"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (createGoodsInput.article === "") {
      return toast.error(t("goods.createPremiseError.article"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (createGoodsInput.barCode === "") {
      return toast.error(t("goods.createPremiseError.barCode"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (createGoodsInput.whereId === "") {
      return toast.error(t("goods.createPremiseError.whereCome"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    }
    setOpenCreateGoodsProps((prev) => !prev);
    const addToBaseGoods: AxiosResponse<number[], number | null> =
      await getGoodsApi.post("/goodsAddToBase.php", createGoodsInput);

    if (addToBaseGoods.data[0] === 0) {
      toast.success(createGoodsInput.name + t("goods.createGoodsSuccess"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else {
      toast.error(t("goods.createGoodsError"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    }

    console.log("addToBaseGoodsData", addToBaseGoods.data[0]);
    console.log("addToBaseGoods", addToBaseGoods);

    // console.log(createGoodsInput);
  };

  return (
    <div className=" fixed top-10 left-[25%] bg-primary w-[100vh] h-[80vh] overflow-hidden z-10 rounded-xl">
      <div className="p-4 text-white">{t("goods.createGoodsModalPage")}</div>
      <form
        onSubmit={createGoodsForm}
        className="flex flex-col gap-4 items-center pt-10"
      >
        <select
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          name="categoryId"
          onChange={handleSelectCategory}
        >
          <option className="text-gray-500" value="0">
            {t("goods.createPremise.category")}
          </option>
          {goodsCategory?.map((item: GoodsCategoryAndWhereIdType) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="name"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          placeholder={t("goods.createPremise.name") as string}
          value={createGoodsInput.name}
          autoComplete="on"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="amount"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          placeholder={t("goods.createPremise.amount") as string}
          value={createGoodsInput.amount}
          autoComplete="on"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="article"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          placeholder={t("goods.createPremise.article") as string}
          value={createGoodsInput.article}
          autoComplete="on"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="barCode"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          placeholder={t("goods.createPremise.barCode") as string}
          value={createGoodsInput.barCode}
          autoComplete="on"
          onChange={handleInputChange}
        />
        <select
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          name="categoryId"
          onChange={handleSelectWhereCome}
        >
          <option className="text-gray-500" value="0">
            {t("goods.createPremise.whereCome")}
          </option>
          {goodsLocation?.map((item: GoodsCategoryAndWhereIdType) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <button
          type="submit"
          className="rounded-md border-2 py-2 px-11 border-primary text-primary bg-white w-[25rem] transition  ease-in hover:text-white hover:bg-secondary"
        >
          {t("goods.createPremise.createButton") as string}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateGoods;
