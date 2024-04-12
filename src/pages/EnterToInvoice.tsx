import { useEffect, useRef, useState } from "react";
import api from "../api";
import { ProductInfoType } from "../types/productTypes";
import Table, { ColumnsType } from "antd/es/table";
import { Button, Card, Input, InputRef, Space, TableColumnType } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ProductToInvoice from "../components/Invoice/product_to_Invoice";
import { InvoiceProductType } from "../types/invoice";
import DeleteIcon from "../assets/icons1/DeleteIcon.svg";
import SelectPremiseForProductInvoice from "../components/Invoice/select_premise_for_product_invoice";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

const EnterToInvoice = () => {
  const [dataProductInfo, setDataProductInfo] = useState<ProductInfoType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [loading, setLoading] = useState(false);
  const [productCartInvoice, setProductCartInvoice] = useState<
    InvoiceProductType[]
  >([]);
  const [selectProductToInvoice, setSelectProductToInvoice] =
    useState<InvoiceProductType>({
      name: "",
      count: 0,
      barcode: "",
      finalPrice: 0,
      initialPrice: 0,
    });

  const fetchProduct = async () => {
    setLoading(true);
    try {
      api.get("/product_info").then((res) => {
        if (res.status === 200) {
          setDataProductInfo(res.data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  type DataIndex = keyof ProductInfoType;

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
  ): TableColumnType<ProductInfoType> => ({
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

  const columnsPremise: ColumnsType<ProductInfoType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => `${name}`,
      width: "100%",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["ascend"],
      ...getColumnSearchProps("name"),
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record: ProductInfoType) => (
        <button
          disabled={
            productCartInvoice?.find(
              (item): item is InvoiceProductType =>
                item.barcode === record.barcode
            ) as boolean | undefined
          }
          className="btn btn-warning"
          onClick={() => handleTransferProduct(record)}
        >
          Qo'shish
        </button>
      ),
    },
  ];

  const handleTransferProduct = (record: ProductInfoType) => {
    const modal = document.getElementById("create_to_invoice_modal");
    if ((modal as any).showModal) (modal as any).showModal();
    setSelectProductToInvoice((prev) => ({
      ...prev,
      name: record.name,
      barcode: record.barcode,
    }));
  };

  const handleDeleteProductToInvoiceCart = (e: string) => {
    const newProductToInvoice = productCartInvoice.filter(
      (item) => item.barcode !== e
    );
    setProductCartInvoice(newProductToInvoice);
  };

  const handleSendProductToInvoice = () => {
    const modal = document.getElementById("create_premise_for_product_invoice");
    if ((modal as any).showModal) (modal as any).showModal();
  };

  return (
    <div className="w-full p-8 relative flex gap-4">
      <dialog id="create_to_invoice_modal" className="modal">
        <div className="modal-box flex justify-center w-4/12 max-w-5xl relative">
          <ProductToInvoice
            selectProductToInvoice={selectProductToInvoice}
            setSelectProductToInvoice={setSelectProductToInvoice}
            setProductCartInvoice={setProductCartInvoice}
          />
          <div className="modal-action absolute bottom-6 right-10">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <Table
        className="w-[700px]"
        columns={columnsPremise}
        rowKey={(record) => record.id}
        dataSource={dataProductInfo}
        loading={loading}
        title={() => <b>Tavarlar</b>}
      />
      <div>
        <Card
          title="Savat(nomi/miqdori/kiritilgan-narx/sotiladigan-narx/barcode)"
          bordered={false}
          style={{ width: 500, height: 500 }}
        >
          <div className="flex flex-col gap-2">
            {productCartInvoice ? (
              productCartInvoice?.map((item: InvoiceProductType) => (
                <div key={item.barcode} className="flex items-center w-full ">
                  <p className="font-bold">
                    {item.name}/{item.count}/{item.initialPrice}/
                    {item.finalPrice}/{item.barcode}
                  </p>
                  <div className="w-[90%] mx-2 border border-dashed"></div>
                  <img
                    className="cursor-pointer"
                    src={DeleteIcon}
                    alt="Delete icon"
                    onClick={() =>
                      handleDeleteProductToInvoiceCart(item.barcode)
                    }
                  />
                </div>
              ))
            ) : (
              <div>Malumot yo'q</div>
            )}
          </div>
        </Card>
        <button
          disabled={productCartInvoice?.length === 0}
          onClick={handleSendProductToInvoice}
          className="btn mt-2 ml-auto"
        >
          Keyingi
        </button>
      </div>
      <dialog id="create_premise_for_product_invoice" className="modal">
        <div className="modal-box flex justify-center w-4/12 max-w-5xl relative">
          <SelectPremiseForProductInvoice
            productCartInvoice={productCartInvoice}
            setProductCartInvoice={setProductCartInvoice}
            fetchProduct={fetchProduct}
          />
          <div className="modal-action absolute bottom-6 right-10">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EnterToInvoice;
