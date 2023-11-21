import { combineReducers } from "@reduxjs/toolkit";
import goodsReducer from "./todoSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  goods: goodsReducer,
  user: userSlice,
});

export default rootReducer;
