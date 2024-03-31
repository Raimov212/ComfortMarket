import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GoodsState } from "./todoSliceType";
import api from "../api";
import { AxiosResponse } from "axios";
import { EditGoodsTypeData } from "../components/Goods/EditGoods/editGoodsType";
import { CreateGoodsTypeData } from "../components/Goods/CreateGoods/createGoodsType";

export const getAllGoods = createAsyncThunk(
  "getAllGoods",
  async (_, { rejectWithValue }) => {
    try {
      console.log(sessionStorage.getItem("token"));

      const goods: AxiosResponse = await api.get("/products");

      console.log("goods", goods);

      return goods.data;
    } catch (error) {
      return rejectWithValue(error);
    }

    // goodsData();
  }
);

export const createGoods = createAsyncThunk(
  "createGoods",
  async (createGoodsInput: CreateGoodsTypeData, { dispatch }) => {
    try {
      const goodsResp = await api.post("/invoice.php", createGoodsInput);

      if (goodsResp.data[0] === 0) {
        dispatch(getAllGoods());
      }

      return goodsResp.data;
    } catch (error) {
      return error;
    }
  }
);

export const editGoods = createAsyncThunk(
  "editGoods",
  async (editGoodsInput: EditGoodsTypeData, { dispatch }) => {
    try {
      const editBaseGoods = await api.post("/goodsEdit.php", editGoodsInput);

      // if (editBaseGoods.data[0] === 0) {
      //   dispatch(getAllGoods());
      // }

      return editBaseGoods.data;
    } catch (error) {
      return error;
    }
  }
);

const initialState: GoodsState = {
  isLoading: false,
  error: "",
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
    // goodsData: (state, action: PayloadAction<any>) => {
    //   state.goodsCount = action.payload[0];
    //   state.goods.push(action.payload[1] !== null && action.payload[1]);
    //   state.goodsCategory.push(action.payload[2] !== null && action.payload[2]);
    //   state.goodsData.push(action.payload[3]);
    //   state.goodsLocation.push(action.payload[4]);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllGoods.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllGoods.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.goodsCount = action.payload[0];
        state.goods.push(action.payload[1] !== null && action.payload[1]);
        state.goodsCategory.push(
          action.payload[2] !== null && action.payload[2]
        );
        state.goodsData.push(action.payload[3]);
        state.goodsLocation.push(action.payload[4]);
      }
    );
    builder.addCase(getAllGoods.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error";
    });
    builder.addCase(editGoods.fulfilled, (state) => {
      state.goods.length = 0;
    });
  },
});

// export const { goodsData } = goodsSlice.actions;

export default goodsSlice.reducer;
