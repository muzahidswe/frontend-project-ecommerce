import {
    addToCart,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
} from "../../redux/slices/cartSlice";
import { createNewStore } from "../../redux/store/store";
import { shoppingItem } from "../mockdata/shoppingCart";

let store = createNewStore();

describe("cart reducer", () => {
    //test for add item to cart
    test("should add shopping item to cart", () => {
        store.dispatch(addToCart(shoppingItem));
    });

    //test for remove item from cart
    test("should remove shopping item from cart", () => {
        store.dispatch(addToCart(shoppingItem));
        store.dispatch(removeItem(shoppingItem.id.toString()));
    });

    //test for increaseQuantity
    test("should increase quantity of shopping item", () => {
        store.dispatch(addToCart(shoppingItem));
        const cartItem = store.getState().cart.carts.find(item => item.id === 1);
        // Dispatch the increaseQuantity action with the found ProductCart object
        if (cartItem) {
            store.dispatch(increaseQuantity(cartItem));
        }
    });

    //test for decreaseQuantity
    test("should decrease quantity of shopping item", () => {
        store.dispatch(addToCart(shoppingItem));
        const cartItem = store.getState().cart.carts.find(item => item.id === 1);
        // Dispatch the decreaseQuantity action with the found ProductCart object
        if (cartItem) {
            store.dispatch(decreaseQuantity(cartItem));
        }
    });
});