import { FormEvent, Key, useEffect, useState } from "react";
import { DataType } from "../types/premiseTypes";
import api from "../api";

import { Table } from "antd";
import type { TableProps } from "antd";
import { CategoryType } from "../types/category";
import CreateCategory from "../components/Category/createCategory";
import { toast } from "react-toastify";
import { t } from "i18next";

type ColumnsType<T> = TableProps<T>["columns"];

export type PremiseTypes = {
  [key: string]: {
    id: string;
    name: string;
  };
};

const Categories = () => {
  const [data, setData] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  const [createCategory, setCreateCategory] = useState<string>("");

  const columnsPremise: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => `${name}`,
      width: "40%",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["ascend"],
    },
    {
      title: "Miqdori",
      dataIndex: "productsCount",
      width: "12%",
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, record: DataType) => (
        <div className="flex gap-2">
          <button
            className="btn btn-warning"
            onClick={() => handleUpdateProduct(record.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-error"
            onClick={() => handleDeleteProduct(record.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteProduct = (key: Key) => {};
  const handleUpdateProduct = (key: Key) => {};

  const getPremiseData = async () => {
    setLoading(false);
    await api.get("/category").then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getPremiseData();
  }, []);

  const handleSubmitCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .post("/category", {
        name: createCategory,
      })
      .then((response) => {
        if (response.status === 200) {
          getPremiseData();
          // setSuccessPremise(true);
          setCreateCategory("");
          toast.success(t("Premise yaratildi"), {
            position: toast.POSITION.TOP_RIGHT,
          });

          const modal = document.getElementById("my_modal_4");
          if ((modal as any).showModal) (modal as any).close();
        }
      });
  };

  const handleTableChange: TableProps["onChange"] = () => {};

  return (
    <div className="p-4">
      <button
        className="btn mb-2 ml-[88%]"
        onClick={() => {
          const modal = document.getElementById("my_modal_4");
          if ((modal as any).showModal) (modal as any).showModal();
        }}
      >
        create category
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box flex justify-center w-4/12 max-w-5xl relative">
          <CreateCategory
            createCategory={createCategory}
            setCreateCategory={setCreateCategory}
            handleSubmitCategory={handleSubmitCategory}
          />
          <div className="modal-action absolute bottom-6 right-10">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <Table
        columns={columnsPremise}
        rowKey={(record) => record.id}
        dataSource={data}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Categories;
