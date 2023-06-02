import { configureStore } from "@reduxjs/toolkit";
import goodsReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    goods: goodsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
