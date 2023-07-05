import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userDataProps = {
  userId: string;
  fullName: string;
  status: string;
};

type userLocationProps = {
  shopId: string;
  shopName: string;
  address: string;
};

type UserState = {
  userData: userDataProps[];
  userLocation: userLocationProps[];
};

const initialState: UserState = {
  userData: [],
  userLocation: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<any>) => {
      state.userData.push(action.payload[0]);
      state.userLocation.push(action.payload[1][0]);
    },
  },
});

export const { userData } = userSlice.actions;

export default userSlice.reducer;
