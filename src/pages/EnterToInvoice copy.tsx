import { useEffect, useState } from "react";
import { Button, Switch, Table, Transfer } from "antd";
import api from "../api";
import type { TableColumnsType, TransferProps } from "antd";
import { ProductInfoType } from "../types/productTypes";

interface RecordType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
}

// const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
//   key: i.toString(),
//   title: `content${i + 1}`,
//   description: `description of content${i + 1}`,
//   disabled: i % 3 < 1,
// }));

const EnterToInvoice = () => {
  const [dataProductInfo, setDataProductInfo] = useState<ProductInfoType[]>([]);
  const [loading, setLoading] = useState(false);

  const [targetKeys, setTargetKeys] = useState<any>([]);
  const [_, setSelectedKeys] = useState<any>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        api.get("/product_info").then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            setDataProductInfo(res.data);
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleChange: TransferProps["onChange"] = (
    newTargetKeys,
    direction,
    moveKeys
  ) => {
    setTargetKeys(newTargetKeys);

    console.log("targetKeys: ", newTargetKeys);
    console.log("direction: ", direction);
    console.log("moveKeys: ", moveKeys);
  };

  const handleSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    // console.log("handleSelectChange", targetSelectedKeys);

    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const filterOption = (inputValue: string, option: RecordType) =>
    option.description.indexOf(inputValue) > -1;

  const handleSearch: TransferProps["onSearch"] = (dir, value) => {
    // console.log("search:", dir, value);
  };

  const hasSelected = targetKeys.length > 0;

  return (
    <div className="w-full p-8 relative">
      <Transfer
        listStyle={{
          width: 400,
          height: 500,
        }}
        dataSource={dataProductInfo}
        rowKey={(record): any => record.id}
        titles={["Tovar haqida", "Invoicega qo'shish"]}
        targetKeys={targetKeys}
        // selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        render={(item) => item.name}
        // filterOption={filterOption}
        showSearch
        onSearch={handleSearch}
        // disabled={disabled}
        oneWay
      />
      <button
        className="btn disabled:btn-ghost mt-4 ml-[87%]"
        disabled={!hasSelected}
      >
        Invoicega kirim
      </button>
    </div>
  );
};

export default EnterToInvoice;
