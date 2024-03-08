import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

import { User } from "../../misc/type";
import { API_BASE_URL } from '../../utils/apiUtils';

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

export const submitUserSignup = createAsyncThunk(
    'submitUserSignup',
    async (userInformation: { name: string; email: string; password: string; avatar: string }, { rejectWithValue }) => {
      try {
            const response = await axios.post(`${API_BASE_URL}users/`, userInformation);
            toast.success('User Registration successfull.');
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveUserInformation: (state, action: PayloadAction<User>) => {
      // logic
      state.user = action.payload;
      localStorage.setItem('userInformation', JSON.stringify(action.payload));
    },
  },
});

const UserReducer = userSlice.reducer;
export const { saveUserInformation } = userSlice.actions;
export default UserReducer;