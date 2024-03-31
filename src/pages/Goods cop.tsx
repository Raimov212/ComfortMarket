import { useAppDispatch, useAppSelector } from "../hook";
import { CreateUser } from "../assets/icons1/TableIcon";
import { useEffect, useState } from "react";
import GoodsItem from "../components/Goods/Items";
// import { allDataGoods } from "../components/Goods/mock";

import { FilterIcon } from "../assets/icons1/filter";
import GoodsFilter from "../components/Goods/FilterGoods/Filter";
import { AllData } from "../components/Goods/goods";
import type { AllProductType, CreatePremiseType } from "../types/premiseTypes";
import CreateGoods from "../components/Goods/CreateGoods/createGoods";
import { ToastContainer, toast } from "react-toastify";
import { t } from "i18next";
import { AxiosResponse } from "axios";
import api from "../api";
import { EditGoodsTypeData } from "../components/Goods/EditGoods/editGoodsType";
import EditGoods from "../components/Goods/EditGoods/editGoods";
import { editGoods, getAllGoods } from "../redux/todoSlice";
import { Loading } from "../components/Suspense";
// import { goodsData } from "../redux/todoSlice";

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
  const dispatch = useAppDispatch();
  const userID = JSON.parse(sessionStorage.getItem("userId") as string);
  const { isLoading } = useAppSelector((state) => state.rootReducer.goods);

  const [searchText, setSearchText] = useState<string>("");
  const [openFilter, setOpenFilter] = useState<Boolean>(false);
  const [openCreateGoods, setOpenCreateGoods] = useState<Boolean>(false);
  const [openEditGoods, setOpenEditGoods] = useState<Boolean>(false);
  const [searchArrItemCategory, setSearchArrItemCategory] =
    useState<string[]>();

  const [data, setData] = useState<AllProductType[]>([]);

  const [createPremise, setCreatePremise] = useState<CreatePremiseType>({
    name: "",
    barcode: "",
    count: 0,
    price: 0,
    categoryId: null,
  });

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

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response: AxiosResponse = await api.get("/products");

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGoods();
  }, []);

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
    if (createPremise.categoryId === 0) {
      return toast.error(t("goods.createPremiseError.category"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (createPremise.name === "") {
      return toast.error(t("goods.createPremiseError.name"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (createPremise.price === null) {
      return toast.error(t("goods.createPremiseError.amount"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } else if (createPremise.barcode === "") {
      return toast.error(t("goods.createPremiseError.barCode"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    }

    const addToBaseGoods: AxiosResponse<number | null | undefined> =
      await api.post("/invoice.php", createPremise);

    if (addToBaseGoods.data === 0) {
      toast.success(createPremise.name + t("goods.createGoodsSuccess"), {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });

      // setCreatePremise((prev) => ({
      //   ...prev,
      //   amount: "",
      //   article: "",
      //   barCode: "",
      //   categoryId: "",
      //   count: "",
      //   name: "",
      //   whereId: "",
      //   premiseId: "",
      // }));

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

    // console.log(createPremise);
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

    console.log("editGoodsInputttttttttttt", editGoodsInput);

    try {
      const editBaseGoods = dispatch(editGoods(editGoodsInput));

      console.log("editBaseGoods", (await editBaseGoods).payload);
      if ((await editBaseGoods)?.payload[0] === 0) {
        toast.success(createPremise.name + t("goods.createGoodsSuccess"), {
          position: toast.POSITION.TOP_RIGHT,
          className: "foo-bar",
        });

        // setCreatePremise((prev) => ({
        //   ...prev,
        //   amount: "",
        //   article: "",
        //   barCode: "",
        //   categoryId: "",
        //   count: "",
        //   name: "",
        //   whereId: "",
        //   premiseId: "",
        // }));

        setTimeout(() => {
          setOpenEditGoods(false);
        }, 3000);
        dispatch(getAllGoods());
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

  console.log("data", data);

  if (isLoading) {
    return <Loading />;
  } else {
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
            goods={data}
            setSearchArrItemCategory={setSearchArrItemCategory}
            setSearchText={setSearchText}
          />
        )}
        {openCreateGoods && (
          <CreateGoods
            setOpenCreateGoodsProps={setOpenCreateGoods}
            createPremise={createPremise}
            setCreatePremise={setCreatePremise}
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
          data={searchText !== "" ? search(data) : data}
          itemsPerPage={0}
          setEditGoodsInput={setEditGoodsInput}
          setOpenEditGoods={setOpenEditGoods}
        />
        <ToastContainer />
      </div>
    );
  }
};

export default Goods;
