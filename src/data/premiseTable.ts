import { ExtraPremiseProductsType } from "../types/premiseTypes";
import { ColumnsType } from "antd/es/table";

export const columnsPremiseExtraProduct: ColumnsType<ExtraPremiseProductsType> =
  [
    {
      title: "Premise",
      dataIndex: "premise",
      sorter: true,
      width: "20%",
    },
    {
      title: "Miqdori",
      dataIndex: "count",
      width: "20%",
    },
  ];
