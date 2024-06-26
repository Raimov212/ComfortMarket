import { configureStore } from "@reduxjs/toolkit";
// import goodsReducer from "./todoSlice";
// import userSlice from "./userSlice";
import goodsReducer from "./todoSlice";
import userSlice from "./userSlice";
import rootReducer from "./combineReducer";

const store = configureStore({
  reducer: {
    rootReducer,
    // goods: goodsReducer,
    // user: userSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
