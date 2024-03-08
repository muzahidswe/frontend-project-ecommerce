import { fetchAllProductCategoryAsync } from "../../redux/slices/categorySlice";
import { createNewStore } from "../../redux/store/store";

let store = createNewStore();

describe("category reducer", () => {
    //test for fetch all data of products
    test("should fetch all categories", async () => {
        await store.dispatch(fetchAllProductCategoryAsync({ offset: 0, limit: 10 }));
        expect(store.getState().categories.error).toBeNull();
        expect(store.getState().categories.loading).toBeFalsy();
    });
});