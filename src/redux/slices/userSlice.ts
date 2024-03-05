import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "../../misc/type";

let userState: User | null = null;
const data = localStorage.getItem("userInformation");

if (data) {
  userState = JSON.parse(data);
}

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: userState,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveUserInformation: (state, action: PayloadAction<User>) => {
      // logic
      // state.user = action.payload;
      localStorage.setItem('userInformation', JSON.stringify(action.payload));
    },
  },
});

const UserReducer = userSlice.reducer;
export const { saveUserInformation } = userSlice.actions;
export default UserReducer;