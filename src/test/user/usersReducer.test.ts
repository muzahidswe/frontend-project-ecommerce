import {
    submitUserSignup,
} from "../../redux/slices/userSlice";
import { createNewStore } from "../../redux/store/store";
import { newUser } from "../mockdata/users";

let store = createNewStore();

describe("user reducer", () => {

    //test for register user
    test("should register a new user", async () => {
        await store.dispatch(submitUserSignup(newUser));
    });
});