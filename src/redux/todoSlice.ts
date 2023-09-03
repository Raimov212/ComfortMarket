import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AllGods = {
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

type GoodsCategory = {
  [x: string]: any;
  count?: string;
  id: string;
  name?: string;
};

type GoodsData = {
  amount?: string;
  count?: string;
  dateAt: string;
  goodsId?: string;
  id: string;
  sellAmount?: string | null;
  shopId: string;
};

type GoodsLocation = {
  [x: string]: any;
  id: string;
  name: string;
};

type GoodsState = {
  goodsCount: number | null;
  goods: AllGods[];
  goodsCategory: GoodsCategory[];
  goodsData: GoodsData[];
  goodsLocation: GoodsLocation[];
};

const initialState: GoodsState = {
  goodsCount: 0,
  goods: [],
  goodsCategory: [],
  goodsData: [],
  goodsLocation: [],
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    goodsData: (state, action: PayloadAction<any>) => {
      state.goodsCount = action.payload[0];
      state.goods.push(action.payload[1] !== null && action.payload[1]);
      state.goodsCategory.push(action.payload[2] !== null && action.payload[2]);
      state.goodsData.push(action.payload[3]);
      state.goodsLocation.push(action.payload[4]);
    },
  },
});

export const { goodsData } = goodsSlice.actions;

export default goodsSlice.reducer;
