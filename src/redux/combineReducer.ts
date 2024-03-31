import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import goodsReducer from "./todoSlice";
import userSlice from "./userSlice";

const combineReducer = combineReducers({
  goods: goodsReducer,
  user: userSlice,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === "RESET") {
    state = {};
  }
  return combineReducer(state, action);
};

export default rootReducer;
