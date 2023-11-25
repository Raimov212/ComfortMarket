import { useAppDispatch, useAppSelector } from "../hook";
import { CreateUser } from "../assets/icons1/TableIcon";
import { useEffect, useState } from "react";
import GoodsItem from "../components/Goods/Items";
// import { allDataGoods } from "../components/Goods/mock";

import { FilterIcon } from "../assets/icons1/filter";
import GoodsFilter from "../components/Goods/FilterGoods/Filter";
import { AllData } from "../components/Goods/goods";
import CreateGoods from "../components/Goods/CreateGoods/createGoods";
import { ToastContainer, toast } from "react-toastify";
import { t } from "i18next";
import { AxiosResponse } from "axios";
import { getGoodsApi } from "../api/goodsApi";
import { CreateGoodsTypeData } from "../components/Goods/CreateGoods/createGoodsType";
import { EditGoodsTypeData } from "../components/Goods/EditGoods/editgoodsType";
import EditGoods from "../components/Goods/EditGoods/editGoods";
import { goodsData } from "../redux/todoSlice";

export const ToastSuccess = () => {
  return (
    <>
      {toast.success(t("goods.createGoodsSuccess"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      })}
    </>
  );
};

const Goods = () => {
  const allData = useAppSelector((state) => state.goods.goods[0]);
  const goods = allData as unknown as AllData[];
  const userID = useAppSelector((state) => state.user.userData[0].userId);
  const parentID = useAppSelector((state) => state.user.userData[0].parentId);

  const [searchText, setSearchText] = useState<string>("");
  const [openFilter, setOpenFilter] = useState<Boolean>(false);
  const [openCreateGoods, setOpenCreateGoods] = useState<Boolean>(false);
  const [openEditGoods, setOpenEditGoods] = useState<Boolean>(false);
  const [searchArrItemCategory, setSearchArrItemCategory] =
    useState<string[]>();

  const [createGoodsInput, setCreateGoodsInput] = useState<CreateGoodsTypeData>(
    {
      userId: userID,
      pUserId: parentID,
      categoryId: "",
      name: "",
      count: "",
      amount: "",
      article: "",
      barCode: "",
      whereId: "",
      premiseId: "",
    }
  );

  const [editGoodsInput, setEditGoodsInput] = useState<EditGoodsTypeData>({
    userId: userID,
    id: "",
    categoryId: "",
    name: "",
    article: "",
    barCode: "",
    whereId: "",
    pictureUrl: "",
  });

  const getAllData = () => {
    return goods;
  };
  useEffect(() => {
    getAllData();
  }, [goods]);

  // const goods = allDataGoods as AllData[];

  function search(rows: AllData[]) {
    return rows.filter((row: AllData) =>
      searchArrItemCategory?.some((item) => {
        if (row[item] !== null) {
          return (
            row[item]
              .toString()
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) > -1
          );
        }
      })
    );
  }

  const handleFilter = (_: React.MouseEvent<HTMLDivElement>) => {
    if (openCreateGoods) {
      setOpenCreateGoods(!openCreateGoods);
    }
    setOpenFilter(!openFilter);
  };

  const handleCreateGoods = (_: React.MouseEvent<HTMLDivElement>) => {
    if (openFilter) {
      setOpenFilter(!openFilter);
    }
    setOpenCreateGoods(!openCreateGoods);
  };

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

    const addToBaseGoods: AxiosResponse<number | null | undefined> =
      await getGoodsApi.post("/invoice.php", createGoodsInput);

    if (addToBaseGoods.data === 0) {
      toast.success(createGoodsInput.name + t("goods.createGoodsSuccess"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });

      setCreateGoodsInput((prev) => ({
        ...prev,
        amount: "",
        article: "",
        barCode: "",
        categoryId: "",
        count: "",
        name: "",
        whereId: "",
        premiseId: "",
      }));

      setTimeout(() => {
        setOpenCreateGoods(false);
      }, 3000);
    } else {
      toast.error(t("goods.createGoodsError"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    }

    console.log("addToBaseGoods", addToBaseGoods);

    // console.log(createGoodsInput);
  };

  const getGoods = () => {
    return goods;
  };

  const editGoodsForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (editGoodsInput.name === "") {
      return toast.error(t("goods.createPremiseError.name"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (editGoodsInput.article === "") {
      return toast.error(t("empty article"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (editGoodsInput.barCode === "") {
      return toast.error(t("goods.createPremiseError.barCode"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    }

    console.log("editGoodsInput", editGoodsInput);

    try {
      const editBaseGoods = await getGoodsApi.post(
        "/goodsEdit.php",
        editGoodsInput
      );
      // setEditData(editBaseGoods.data[1]);

      console.log("editBaseGoods", editBaseGoods);
      if (editBaseGoods.data[0] === 0) {
        toast.success(createGoodsInput.name + t("goods.createGoodsSuccess"), {
          position: toast.POSITION.TOP_RIGHT,
          className: "foo-bar",
        });

        getGoods();

        setCreateGoodsInput((prev) => ({
          ...prev,
          amount: "",
          article: "",
          barCode: "",
          categoryId: "",
          count: "",
          name: "",
          whereId: "",
          premiseId: "",
        }));

        setTimeout(() => {
          setOpenEditGoods(false);
        }, 3000);
      } else {
        toast.error(t("goods.createGoodsError"), {
          position: toast.POSITION.TOP_RIGHT,
          className: "foo-bar",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col box-border p-2 gap-1 w-[99%] h-full bg-white m-2 ">
      <div className="border-b-2 border-one w-[98%] mt-2 text-2xl text-one">
        Goods
      </div>
      <div className="flex w-full pr-6 items-center justify-end">
        <div onClick={handleFilter} className="cursor-pointer ">
          <FilterIcon />
        </div>
        <div onClick={handleCreateGoods} className=" cursor-pointer ">
          <CreateUser />
        </div>
      </div>
      {openFilter && (
        <GoodsFilter
          goods={goods}
          setSearchArrItemCategory={setSearchArrItemCategory}
          setSearchText={setSearchText}
        />
      )}
      {openCreateGoods && (
        <CreateGoods
          setOpenCreateGoodsProps={setOpenCreateGoods}
          createGoodsInput={createGoodsInput}
          setCreateGoodsInput={setCreateGoodsInput}
          createGoodsForm={createGoodsForm}
        />
      )}
      {openEditGoods && (
        <EditGoods
          setOpenEditGoodsProps={setOpenEditGoods}
          editGoodsInput={editGoodsInput}
          setEditGoodsInput={setEditGoodsInput}
          editGoodsForm={editGoodsForm}
        />
      )}
      <GoodsItem
        data={searchText !== "" ? search(goods) : goods}
        itemsPerPage={0}
        setEditGoodsInput={setEditGoodsInput}
        setOpenEditGoods={setOpenEditGoods}
      />
      <ToastContainer />
    </div>
  );
};

export default Goods;
