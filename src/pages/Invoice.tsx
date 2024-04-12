import { Key, useEffect, useRef, useState } from "react";
// import CreatePremise from "../components/Premise/createPremise";
import { CreatePremiseType } from "../types/premiseTypes";
import api from "../api";

import { Button, Input, Space, Table } from "antd";
import type { GetProp, InputRef, TableColumnType, TableProps } from "antd";
import { PremiseProducts } from "../types/premiseProductsTypes";
import CreatePremiseProduct from "../components/Premise/createPremiseProduct";
import TransferProduct from "../components/Premise/transferProduct";
import { ProductsDataType } from "../types/productTypes";
import { InvoiceDataType, InvoiceProductType } from "../types/invoice";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

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

const Invoice = () => {
  const [data, setData] = useState<InvoiceDataType[]>([]);
  const [loading, setLoading] = useState(false);
  //FILTER TABLE
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const [selectProductId, setSelectProductId] = useState<number | null>();
  const [successPremise, setSuccessPremise] = useState<boolean>(false);
  const [selectPremise, setSelectPremise] = useState<
    InvoiceDataType | undefined
  >();
  const [selectPremiseId, setSelectPremiseId] = useState<number | undefined>();
  const [selectTransfer, setSelectTransfer] =
    useState<ProductsDataType | null>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
      pageSizeOptions: [5, 7, 10, 15, 20],
      showSizeChanger: true,
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
  // const handleUpdatePremiseProduct = (key: InvoiceDataType) => {
  //   const modal = document.getElementById("my_modal_4");
  //   if ((modal as any).showModal) (modal as any).showModal();
  //   setSelectPremise(key);
  // };

  useEffect(
    () => {
      const getPremiseData = async () => {
        setLoading(true);
        try {
          await api.get("/invoice").then(({ data }) => {
            console.log("data", data);
            setData(data);
            setLoading(false);
            // setTableParams({
            //   ...tableParams,
            //   pagination: {
            //     ...tableParams.pagination,
            //     total: data?.length,
            //   },
            // });
          });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      getPremiseData();

      setTimeout(() => {
        setSuccessPremise(false);
      }, 1000);
    },
    [
      // tableParams.pagination?.current,
      // tableParams.pagination?.pageSize,
      // successPremise,
    ]
  );

  type DataIndex = keyof InvoiceDataType;

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<InvoiceDataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, backgroundColor: "#1890ff", color: "white" }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columnsPremise: ColumnsType<InvoiceDataType> = [
    {
      title: "No",
      dataIndex: "id",
      rowScope: "row",
    },
    {
      title: "Do'kon nomi",
      dataIndex: "premise",
      render: (name) => `${name}`,
      width: "40%",
      sorter: (a, b) => a.premise.length - b.premise.length,
      sortDirections: ["ascend"],
      ...getColumnSearchProps("premise"),
    },
    {
      title: "Sana",
      dataIndex: "date",
      width: "12%",
    },
    {
      title: "Umumiy kiritilgan narxi",
      dataIndex: "overallInitialPrice",
      width: "10%",
    },
    {
      title: "Umumiy sotilish narxi",
      dataIndex: "overallFinalPrice",
      width: "10%",
    },
    {
      title: "Tavarlar xarakati",
      dataIndex: "action",
      width: "10%",
    },
    {
      title: "Tavarlar xolati",
      dataIndex: "status",
      filters: [
        { text: "ACCEPTED", value: "ACCEPTED" },
        { text: "PENDING", value: "PENDING" },
      ],
      onFilter: (value: boolean | Key, record: InvoiceDataType) =>
        record.status.indexOf(value as string) === 0,
      width: "10%",
      render: (item) =>
        (item === "ACCEPTED" && (
          <div className="text-green-400">ACCEPTED</div>
        )) ||
        (item === "PENDING" && (
          <div className="text-yellow-400">PENDING</div>
        )) ||
        (item === "REJECT" && <div className="text-red-400">REJECT</div>),
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record: InvoiceDataType) => (
        <div className="flex gap-2">
          <button
            className="btn btn-warning"
            onClick={() => handleAddPremiseProduct(record.id)}
          >
            Edit
          </button>
          {/* <button
            className="btn btn-warning"
            onClick={() => handleUpdatePremiseProduct(record)}
          >
            Edit
          </button> */}
        </div>
      ),
    },
  ];

  const columnsPremiseProduct: ColumnsType<InvoiceProductType> = [
    {
      title: "Tavar nomi",
      dataIndex: "name",
      sorter: true,
      // sorte: (a, b) => a.name.length - b.name.length,
      width: "20%",
    },
    {
      title: "Miqdori",
      dataIndex: "count",
      width: "10%",
      // onFilter: (value: string, record) => record.name.indexOf(value) === 0,
      // sortDirections: ["descend"],
    },
    {
      title: "Kiritilgan narx",
      dataIndex: "initialPrice",
      width: "10%",
    },
    {
      title: "Sotiladigan narx",
      dataIndex: "finalPrice",
      width: "20%",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      width: "20%",
    },
  ];

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
      {/* <button
        className="btn mb-2 ml-[86%]"
        onClick={() => {
          const modal = document.getElementById("my_modal_4");
          if ((modal as any).showModal) (modal as any).showModal();
        }}
      >
        create new premise
      </button> */}
      {/* <dialog id="my_modal_4" className="modal">
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
      </dialog> */}
      {/* <dialog id="my_modal_5" className="modal">
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
      </dialog> */}
      {/* <dialog id="my_modal_6" className="modal">
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
      </dialog> */}
      <Table
        columns={columnsPremise}
        rowKey={(record) => record.id}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        // pagination={{
        //   pageSizeOptions: ["10", "20"],
        //   showSizeChanger: false,
        //   // pageSize: data?.length,
        //   total: data?.length * 5,
        // }}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        expandable={{
          columnTitle: "Tavarlar",
          expandedRowRender: (record) => {
            setSelectPremiseId(record.id);
            return (
              <Table
                columns={columnsPremiseProduct}
                dataSource={record.products}
                rowKey={(record) => record.barcode}
                // onChange={handleTableChild}
              />
            );
          },
        }}
      />
    </div>
  );
};

export default Invoice;
