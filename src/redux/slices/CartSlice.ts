import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductCart } from "../../misc/type";

type InitialState = {
    carts: ProductCart[];
};

const initialState: InitialState = {
    carts: [],
};

const cartsSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductCart>) => {
            const existingItem = state.carts.find(item => item.id === action.payload.id);
            if (!existingItem) {
                state.carts.push(action.payload);
                localStorage.setItem('cartItemsList', JSON.stringify(state.carts));
            }
        },
        increaseQuantity: (state, action: PayloadAction<ProductCart>) => {
            const foundProduct = state.carts.find((item) => item.id === action.payload.id);
            if (foundProduct) {
                foundProduct.quantity += 1;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<ProductCart>) => {
            const foundProduct = state.carts.find((item) => item.id === action.payload.id);
            if (foundProduct) {
                if(foundProduct.quantity > 0){
                    foundProduct.quantity -= 1;
                } else {
                    console.log('Minimum Quantity is 1');
                }
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.carts = state.carts.filter((item) => item.id !== parseInt(action.payload));
        },
    },
});

const cartReducer = cartsSlice.reducer;
export const { addToCart, increaseQuantity, decreaseQuantity,removeItem } = cartsSlice.actions;
export default cartReducer;