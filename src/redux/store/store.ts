import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../slices/ProductSlice";
import ProductCategoryReducer from "../slices/CategorySlice";
import { useDispatch } from "react-redux";
import cartReducer from "../slices/CartSlice";
import UserReducer from "../slices/UserSlice";

// store all states
const store = configureStore({
  reducer: {
    products: ProductReducer,
    productCategory: ProductCategoryReducer,
    carts: cartReducer,
    users: UserReducer,
  },
});
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

// save user state in local storage
store.subscribe(() => {
  // const currentState = store.getState();
  // const userInformation = currentState.users.user;
  // store user
  // localStorage.setItem("userInformation", JSON.stringify(userInformation));
});

export default store;