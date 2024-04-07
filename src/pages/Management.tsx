import { Key, useEffect, useState } from "react";
import CreatePremise from "../components/Premise/createPremise";
import { CreatePremiseType, DataType } from "../types/premiseTypes";
import api from "../api";

import { Table } from "antd";
import type { GetProp, TableProps } from "antd";
import { columnsPremiseExtraProduct } from "../data/premiseTable";
import { PremiseProducts } from "../types/premiseProductsTypes";
import CreatePremiseProduct from "../components/Premise/createPremiseProduct";
import TransferProduct from "../components/Premise/transferProduct";
import { ProductsDataType } from "../types/productTypes";

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;
// type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}
type ColumnsType<T> = TableProps<T>["columns"];

export type PremiseTypes = {
  [key: string]: {
    id: string;
    name: string;
  };
};

const PremiseType: PremiseTypes = {
  SHOP: {
    id: "SHOP",
    name: "Do'kon",
  },
  WAREHOUSE: {
    id: "WAREHOUSE",
    name: "Ombor",
  },
};

const Management = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectProductId, setSelectProductId] = useState<number | null>();
  const [successPremise, setSuccessPremise] = useState<boolean>(false);
  const [selectPremise, setSelectPremise] = useState<DataType | undefined>();
  const [selectPremiseId, setSelectPremiseId] = useState<number | undefined>();
  const [selectTransfer, setSelectTransfer] =
    useState<ProductsDataType | null>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
      // pageSizeOptions: [5, 7, 10, 15, 20],
      showSizeChanger: false,
    },
  });

  const [formData, setFormData] = useState<CreatePremiseType>({
    name: "",
    address: "",
    type: PremiseType.SHOP.id,
  });

  const [premiseProducts, setPremiseProducts] = useState<PremiseProducts>({
    name: "",
    barcode: "",
    count: null,
    price: null,
    categoryId: 0,
  });

  const handleAddPremiseProduct = (key: React.Key) => {
    const modal = document.getElementById("my_modal_5");
    if ((modal as any).showModal) (modal as any).showModal();
    setSelectProductId(Number(key));
  };
  const handleUpdatePremiseProduct = (key: DataType) => {
    const modal = document.getElementById("my_modal_4");
    if ((modal as any).showModal) (modal as any).showModal();
    setSelectPremise(key);
  };

  const handleTransferProduct = (key: ProductsDataType) => {
    const modal = document.getElementById("my_modal_6");
    if ((modal as any).showModal) (modal as any).showModal();
    setSelectTransfer(key);
    setSelectProductId(key.id);
  };

  const columnsPremise: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => `${name}`,
      width: "20%",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["ascend"],
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "40%",
    },
    {
      title: "Xodim",
      dataIndex: "owner",
      width: "20%",
    },
    {
      title: "Type",
      dataIndex: "type",
      filters: [
        { text: "SHOP", value: "SHOP" },
        { text: "WAREHOUSE", value: "WAREHOUSE" },
      ],
      // onFilter: (value: boolean | Key, record: DataType) =>
      //   record.type.indexOf(value as string) === 0,
      // width: "20%",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record: DataType) => (
        <div className="flex gap-2">
          <button
            className="btn btn-success"
            onClick={() => handleAddPremiseProduct(record.id)}
          >
            Add
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleUpdatePremiseProduct(record)}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  // const columnsPremiseProduct: ColumnsType<ProductsDataType> = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     sorter: true,
  //     render: (name) => `${name}`,
  //     width: "20%",
  //   },
  //   {
  //     title: "Narxi",
  //     dataIndex: "price",
  //     width: "20%",
  //     // onFilter: (value: string, record) => record.name.indexOf(value) === 0,
  //     sorter: (a, b) => a.name.length - b.name.length,
  //     sortDirections: ["descend"],
  //   },
  //   {
  //     title: "Sana",
  //     dataIndex: "createdAt",
  //     width: "20%",
  //   },
  //   {
  //     title: "Categoriya",
  //     dataIndex: "category",
  //     width: "20%",
  //   },
  //   {
  //     title: "Barcode",
  //     dataIndex: "barcode",
  //     width: "20%",
  //   },
  //   {
  //     title: "User",
  //     dataIndex: "addedBy",
  //     width: "20%",
  //   },
  //   {
  //     title: "operation",
  //     dataIndex: "operation",
  //     render: (_, record: ProductsDataType) => (
  //       <button onClick={() => handleTransferProduct(record)}>Transfer</button>
  //     ),
  //   },
  // ];

  useEffect(() => {
    const getPremiseData = async () => {
      setLoading(false);
      await api.get("/premise").then(({ data }) => {
        setData(data);
        setLoading(false);
      });
    };

    getPremiseData();

    setTimeout(() => {
      setSuccessPremise(false);
    }, 1000);
  }, [0]);

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  // const handleSelectPremiseId = (record: any) => {

  //   return record.id;
  //   // console.log("record", record);
  // };

  // const rowSelection: TableRowSelection<DataType> = {
  //   onChange: () => {},
  //   onSelect: (record) => {
  //   },
  //   checkStrictly: false,
  //   // onSelectAll: (selected, selectedRows, changeRows) => {
  //   //   console.log(selected, selectedRows, changeRows);
  //   // },
  // };

  return (
    <div className="p-4">
      <button
        className="btn mb-2 ml-[86%]"
        onClick={() => {
          const modal = document.getElementById("my_modal_4");
          if ((modal as any).showModal) (modal as any).showModal();
        }}
      >
        create new premise
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box flex justify-center w-4/12 max-w-5xl relative">
          <CreatePremise
            PremiseType={PremiseType}
            formData={formData}
            setFormData={setFormData}
            selectPremise={selectPremise}
            setSuccessPremise={setSuccessPremise}
          />
          <div className="modal-action absolute bottom-6 right-10">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box flex justify-center w-4/12 max-w-5xl relative">
          <CreatePremiseProduct
            id={Number(selectProductId)}
            setPremiseProducts={setPremiseProducts}
            premiseProducts={premiseProducts}
          />
          <div className="modal-action absolute bottom-6 right-10">
            <form method="dialog">
              <button className="btn" onClick={() => setSelectProductId(null)}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_6" className="modal">
        <div className="modal-box flex justify-center w-4/12 max-w-5xl relative">
          <TransferProduct
            selectTransfer={selectTransfer}
            selectProductId={Number(selectProductId)}
            selectPremiseId={selectPremiseId}
          />
          <div className="modal-action absolute bottom-6 right-10">
            <form method="dialog">
              <button className="btn" onClick={() => setSelectTransfer(null)}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <Table
        columns={columnsPremise}
        rowKey={(record) => record.id}
        dataSource={data.filter((item) => item.type === "SHOP")}
        // rowSelection={{ ...rowSelection }}
        pagination={false}
        loading={loading}
        onChange={handleTableChange}
        // expandable={{
        //   expandedRowRender: (record) => {
        //     setSelectPremiseId(record.id);
        //     return (
        //       <Table
        //         columns={columnsPremiseProduct}
        //         dataSource={record.products}
        //         rowKey={(record) => record.id}
        //         // onChange={handleTableChild}
        //         expandable={{
        //           expandedRowRender: (second) => {
        //             return (
        //               <Table
        //                 columns={columnsPremiseExtraProduct}
        //                 dataSource={second.extra}
        //                 rowKey={(record) => record.premise}
        //               />
        //             );
        //           },
        //         }}
        //       />
        //     );
        //   },
        // }}
      />
    </div>
  );
};

export default Management;
