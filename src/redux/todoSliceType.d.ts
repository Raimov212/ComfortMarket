export type AllGods = {
  article?: string;
  barCode?: string;
  category?: string;
  categoryId: string;
  id: string;
  name?: string;
  pictureUrl?: HTMLImageElement | null;
  shopId: string;
  whereId: string;
};

export type GoodsCategory = {
  [x: string]: any;
  count?: string;
  id: string;
  name?: string;
};

export type GoodsData = {
  amount?: string;
  count?: string;
  dateAt: string;
  goodsId?: string;
  id: string;
  sellAmount?: string | null;
  shopId: string;
};

export type GoodsLocation = {
  [x: string]: any;
  id: string;
  name: string;
};

export type GoodsState = {
  isLoading: boolean;
  error: string;
  goodsCount: number | null;
  goods: AllGods[];
  goodsCategory: GoodsCategory[];
  goodsData: GoodsData[];
  goodsLocation: GoodsLocation[];
};
