type InvoiceStatusType = "PENDING" | "ACCEPTED" | "REJECTED";
type InvoiceActionType = "IMPORT" | "EXPORT" | "TRANSFER ";

export interface InvoiceDataType {
  id: number;
  description: string;
  date: string;
  premise: string;
  overallInitialPrice: number;
  overallFinalPrice: number;
  products: [
    {
      name: string;
      count: number;
      initialPrice: number;
      finalPrice: number;
      barcode: string;
    }
  ];
  toUser: string;
  createdBy: string;
  status: InvoiceStatusType;
  previousPremiseName: string;
  action: InvoiceActionType;
}

interface InvoiceProductType {
  barcode: string;
  count: number;
  initialPrice: number;
  finalPrice: number;
}

export interface CreateInvoiceType {
  premiseId: null;
  description: string;
  action: InvoiceActionType;
  previousId: number;
  products: InvoiceProductType[];
}
