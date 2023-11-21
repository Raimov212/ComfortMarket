import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userDataProps = {
  userId: string;
  fullName: string;
  status: string;
  parentId: string;
};

type userLocationProps = {
  id: string;
  premiseName: string;
  address: string;
};

type UserState = {
  userData: userDataProps[];
  userLocation: userLocationProps[];
  statusProps: string;
};

const initialState: UserState = {
  userData: [],
  userLocation: [] || null,
  statusProps: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<any>) => {
      state.userData.push(action.payload[0] !== null && action.payload[0]);
      state.userLocation.push(
        action.payload[1] !== null && action.payload[1][0]
      );
    },
    userStatus: (state, action: PayloadAction<string>) => {
      state.statusProps = action.payload;
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

export const { userData, userStatus } = userSlice.actions;

export default userSlice.reducer;
