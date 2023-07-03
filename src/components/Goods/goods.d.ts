type AllData = {
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
  jumpArr: Array<number>;
  //   newData: AllData[];
};
