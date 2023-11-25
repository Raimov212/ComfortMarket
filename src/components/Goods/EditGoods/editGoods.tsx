import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  EditGoodsType,
  EditGoodsTypeData,
  GoodsCategoryAndWhereIdType,
} from "./editgoodsType";
import { useAppSelector } from "../../../hook";
import { t } from "i18next";
import { ToastContainer } from "react-toastify";
import { IoClose } from "react-icons/io5";

const EditGoods: React.FC<EditGoodsType> = ({
  setOpenEditGoodsProps,
  editGoodsInput,
  setEditGoodsInput,
  editGoodsForm,
}): JSX.Element => {
  const goodsCategory = useAppSelector((state) => state.goods.goodsCategory[0]);
  const goodsLocation = useAppSelector((state) => state.goods.goodsLocation[0]);

  const [editImageUpload, setEditImageUpload] = useState<File | null>(null);

  console.log("editGoodsInput", editGoodsInput);
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditGoodsInput({
        ...editGoodsInput,
        [e.target.name]: e.target.value,
      });
    },
    [editGoodsInput]
  );

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditGoodsInput({
      ...editGoodsInput,
      categoryId: e.target.value,
    });
  };

  const handleSelectWhereCome = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditGoodsInput((prev: EditGoodsTypeData) => ({
      ...prev,
      whereId: e.target.value,
    }));
  };

  const handleSelectPremiseType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditGoodsInput({
      ...editGoodsInput,
      premiseId: e.target.value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditImageUpload(e.target.files[0]);
    }
  };

  useEffect(() => {
    const handleKeydown = (event: { key: string | undefined }) => {
      if (event.key == undefined) {
        return;
      } else if (event.key === "Escape") {
        setOpenEditGoodsProps((prev: boolean) => !prev);
      } else {
        return;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className="pb-4 fixed left-[25%] bg-primary w-[100vh] h-[80vh] overflow-hidden z-10 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="p-4 text-white">{t("goods.editGoodsModalPage")}d</div>
        <div
          onClick={() => setOpenEditGoodsProps(false)}
          className="text-white mr-4 cursor-pointer text-2xl"
        >
          <IoClose />
        </div>
      </div>
      <form
        onSubmit={editGoodsForm}
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
          value={editGoodsInput.name}
          autoComplete="on"
          onChange={handleInputChange}
        />
        {/* <input
          type="text"
          name="amount"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          placeholder={t("goods.createPremise.amount") as string}
          value={editGoodsInput.amount}
          autoComplete="on"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="count"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          placeholder={t("goods.createPremise.count") as string}
          value={editGoodsInput.count}
          autoComplete="on"
          onChange={handleInputChange}
        /> */}
        <input
          type="text"
          name="article"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          placeholder={t("goods.createPremise.article") as string}
          value={editGoodsInput.article}
          autoComplete="on"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="barCode"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          placeholder={t("goods.createPremise.barCode") as string}
          value={editGoodsInput.barCode}
          autoComplete="on"
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="pictureUrl"
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          placeholder={t("goods.createPremise.barCode") as string}
          value={editGoodsInput.pictureUrl}
          autoComplete="on"
          onChange={handleImageChange}
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
        <select
          className="outline-none border-2 border-primary rounded-md p-2 visible focus:border-secondary w-[25rem]"
          name="categoryId"
          onChange={handleSelectPremiseType}
        >
          <option className="text-gray-500" value="0">
            shop
          </option>
          <option className="text-gray-500" value="1">
            wareHouse
          </option>
          <option className="text-gray-500" value="2">
            vitrine
          </option>
          <option className="text-gray-500" value="3">
            marketPlace
          </option>
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

export default EditGoods;
