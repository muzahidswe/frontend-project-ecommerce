import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import ProductReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";
import UserReducer from "../slices/userSlice";
import ProductCategoryReducer from "../slices/categorySlice";

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
  const currentState = store.getState();
  const userInformation = currentState.users.user;
  // store user
  localStorage.setItem("userInformation", JSON.stringify(userInformation));
});

export const createNewStore = () => {
  return configureStore({
    reducer: {
      products: ProductReducer,
      categories: ProductCategoryReducer,
      users: UserReducer,
      cart: cartReducer,
    },
  });
};

export default store;