export type AllData = {
  [key: string]: string;
  amount: string;
  article: string;
  barCode: string;
  category: string;
  categoryId: string;
  count: string;
  id: string;
  name: string;
  pictureUrl: null;
  shopId: string;
  whereId: string;
  wherecome: string;
};

export type Data = {
  data: AllData[];
  itemsPerPage: number;
};

export type GoodsProps = {
  [key: string]: string[];
  categoryFilter: string[] | null;
  nameFilter: string[] | null;
  amountFilter: string[] | null;
  articleFilter: string[] | null;
  barCodeFilter: string[] | null;
  wherecomeFilter: string[] | null;
};
