import { Product } from "../../misc/type";
import {
    fetchAllProductsAsync,
    fetchSingleProduct,
    submitAddProduct,
    submitEditProduct,
    deleteProduct,
    searchProductByName,
    sortProducts,
} from "../../redux/slices/productSlice";

import { createNewStore } from "../../redux/store/store";

import {
    ascMockProducts,
    descMockProducts,
} from "../mockdata/products";

let store = createNewStore();

describe("product reducer", () => {
    //test for fetch all data of products
    test("Fetch All Products From Api", async () => {
        await store.dispatch(fetchAllProductsAsync({ offset: 0, limit: 10 }));
        expect(store.getState().products.products.length).toBe(3);
        expect(store.getState().products.error).toBeNull();
        expect(store.getState().products.loading).toBeFalsy();
    });

    //test for sorting products by price in price-low-to-high order
    test("should sort products by price in descending order", async () => {
        await store.dispatch(fetchAllProductsAsync({ offset: 0, limit: 10 }));
        store.dispatch(sortProducts("price-low-to-high"));
        expect(store.getState().products.products).toEqual(descMockProducts);
    });

    // test for sorting products by price in ascending order
    test("should sort products by price in price-high-to-low order", async () => {
        await store.dispatch(fetchAllProductsAsync({ offset: 0, limit: 10 }));
        store.dispatch(sortProducts("price-high-to-low"));
        expect(store.getState().products.products).toEqual(ascMockProducts);
    });

    // test for search by name
    test("should search products by name", async () => {
        await store.dispatch(fetchAllProductsAsync({ offset: 0, limit: 10 }));
        store.dispatch(searchProductByName("wallet"));
        expect(store.getState().products.products.length).toBe(1);
    });

    // create new product
    test("should create a new product", async () => {
        const newProduct = {
            "title": "New Product",
            "price": "10",
            "description": "A description",
            "categoryId": "1",
            "images": [
                "https://placeimg.com/640/480/any",
                "https://placeimg.com/640/480/any",
                "https://placeimg.com/640/480/any"
            ]
        };
        await store.dispatch(submitAddProduct(newProduct));
        expect(store.getState().products.products.length).toBe(1);
    });

    // test for fetching single product by id
    test("should fetch a single product by id", async () => {
        // Dispatch the action to fetch the product
        const dispatchedAction = await store.dispatch(fetchSingleProduct("1"));
        const expectedAction = {
            type: "fetchSingleProduct/fulfilled",
            payload: {
                data: {
                    "id": 11,
                    "title": "Classic Red Baseball Cap",
                    "price": 35,
                    "description": "Elevate your casual wardrobe with this timeless red baseball cap. Crafted from durable fabric, it features a comfortable fit with an adjustable strap at the back, ensuring one size fits all. Perfect for sunny days or adding a sporty touch to your outfit.",
                    "images": [
                        "https://i.imgur.com/cBuLvBi.jpeg",
                        "https://i.imgur.com/N1GkCIR.jpeg",
                        "https://i.imgur.com/kKc9A5p.jpeg"
                    ],
                    "creationAt": "2024-03-07T19:06:11.000Z",
                    "updatedAt": "2024-03-07T19:06:11.000Z",
                    "category": {
                        "id": 1,
                        "name": "nuevo",
                        "image": "https://i.imgur.com/QkIa5tT.jpeg",
                        "creationAt": "2024-03-07T19:06:11.000Z",
                        "updatedAt": "2024-03-07T20:14:58.000Z"
                    }
                },
                id: 1,
            },
        };
        expect(dispatchedAction).toEqual(expectedAction);
        expect(store.getState().products.error).toBeNull();
        expect(store.getState().products.loading).toBeFalsy();
    });

    // test for updating product title
    test("should update a product", async () => {
        const updates = {
            productId: "2",
            formData: {
                title: "Change title",
                price: "100",
                images: [
                    "https://placeimg.com/640/480/any",
                    "https://placeimg.com/640/480/any",
                    "https://placeimg.com/640/480/any",
                ]
            }
        };
        const dispatchedAction = await store.dispatch(submitEditProduct(updates));
        const expectedAction = {
            type: "submitEditProduct/fulfilled",
            payload: {
                id: 2,
                title: "Change title",
                price: 25,
                description:
                    "Make a statement with our Stylish Marble Pattern Notebook, designed to inspire creativity and organization. This sleek notebook features high-quality paper with a luxurious marble print cover, perfect for jotting down thoughts, sketches, or keeping track of your busy schedule. Whether for work, school, or personal use, this notebook is a must-have accessory for any modern individual.",
                images: [
                    "https://placeimg.com/640/480/any",
                    "https://placeimg.com/640/480/any",
                    "https://placeimg.com/640/480/any",
                ],
                creationAt: "2024-02-29T03:37:26.000Z",
                updatedAt: "2024-02-29T08:18:20.000Z",
                category: {
                    id: 5,
                    name: "Miscellaneous",
                    image: "https://i.imgur.com/7OcN6uW.jpg",
                    creationAt: "2024-02-29T03:37:26.000Z",
                    updatedAt: "2024-02-29T03:37:26.000Z",
                },
            },
            meta: {
                arg: { id: 2, data: { title: "Stylish Notebook" } },
                requestId: expect.any(String),
                requestStatus: "fulfilled",
            },
        };
        expect(dispatchedAction).toEqual(expectedAction);
        expect(store.getState().products.error).toBeNull();
        expect(store.getState().products.loading).toBeFalsy();
    });

    //test for delete product
    test("delete product successfully", async () => {
        const dispatchedAction = await store.dispatch(deleteProduct(2));
        const expectedAction = {
            type: "deleteProduct/fulfilled",
            payload: true,
            meta: {
                arg: 2,
                requestId: expect.any(String),
                requestStatus: "fulfilled",
            },
        };
        expect(dispatchedAction).toEqual(expectedAction);
        await store.dispatch(deleteProduct(2));
        expect(store.getState().products.error).toBeNull();
        expect(store.getState().products.loading).toBeFalsy();
    });
});