import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GoodsState } from "./todoSliceType";

// export const getAllGoodsApi = createAsyncThunk(
//   "getAllGoods",
//   async ()=>{
//     const
//   }
// )

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
