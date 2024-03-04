import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductCategory } from "../../misc/type";
import { API_BASE_URL } from '../../utils/apiUtils';

type InitialState = {
    productCategory: ProductCategory[];
    loading: boolean;
    error: string | null;
};

const initialState: InitialState = {
    productCategory: [],
    loading: false,
    error: null,
};

const url = API_BASE_URL + 'categories';

type Pagination = {
    offset: number;
    limit: number;
};

export const fetchAllProductCategoryAsync = createAsyncThunk("fetchAllProductCategoryAsync",
    async ({ offset, limit }: Pagination, { rejectWithValue }) => {
        try {
            const jsonData = await fetch(`${url}?offset=${offset}&limit=${limit}`);
            const data: ProductCategory[] = await jsonData.json();
            return data;
        } catch (e) {
            console.log('error');
            console.error('Error occurred:', e);
            return rejectWithValue(e);
        }
    }
);

const CategorySlice = createSlice({
    name: "productCategory",
    initialState,
    reducers: {
        // searching logic here
        searchProductByName: (state, action: PayloadAction<string>) => {
            state.productCategory.filter((productCategory) =>
                productCategory.name.toLowerCase().includes(action.payload.toLowerCase())
            );
        },
        changeTheme: () => {
            // logic
        },
    },
    extraReducers(builder) {
        // success
        builder.addCase(fetchAllProductCategoryAsync.fulfilled, (state, action) => {
            return {
                ...state,
                productCategory: action.payload,
                loading: false,
                error: null,
            };
        });
        // loading
        builder.addCase(fetchAllProductCategoryAsync.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        });
        // error
        builder.addCase(fetchAllProductCategoryAsync.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.error.message ?? "error",
            };
        });
    },
});

const ProductCategoryReducer = CategorySlice.reducer;
export const { searchProductByName } = CategorySlice.actions;
export default ProductCategoryReducer;