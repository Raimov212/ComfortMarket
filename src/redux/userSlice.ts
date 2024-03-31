import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStoreState, WorkersUser } from "../types/userTypes";

const initialState: UserStoreState = {
  userPremises: [],
  userWorkers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userDataPremises: (state, action: PayloadAction<any>) => {
      state.userPremises = action.payload !== null && action.payload;
    },
    userDataWorkers: (state, action: PayloadAction<any>) => {
      state.userWorkers = action.payload !== null && action.payload;
    },
    // clearAllUser(state, action): never[] | undefined {
    //   return [];
    // },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(clearAllUser, () => {
  //     return;
  //   });
  // },
});

export const { userDataPremises, userDataWorkers } = userSlice.actions;

export default userSlice.reducer;
