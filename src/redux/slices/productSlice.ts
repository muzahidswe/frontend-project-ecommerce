import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../misc/type";
import { API_BASE_URL } from '../../utils/apiUtils';

const url = API_BASE_URL + 'products';

type InitialState = {
    products: Product[];
    loading: boolean;
    error: string | null;
    filteredProducts: Product[];
};

const initialState: InitialState = {
    products: [],
    loading: false,
    error: null,
    filteredProducts: []
};

type Pagination = {
    offset: number;
    limit: number;
};

export const fetchAllProductsAsync = createAsyncThunk("fetchAllProductsAsync",
    async ({ offset, limit }: Pagination, { rejectWithValue }) => {
        try {
            const jsonData = await fetch(`${url}?offset=${offset}&limit=${limit}`);
            const data: Product[] = await jsonData.json();
            return data;
        } catch (e) {
            console.log('error');
            console.error('Error occurred:', e);
            return rejectWithValue(e || 'Failed to fetch products');
        }
    }
);

export const fetchSingleProduct = createAsyncThunk(
    'fetchSingleProduct',
    async (productId: string, { rejectWithValue }) => {
        try {
            const jsonData = await fetch(`${url}/${productId}`);
            const data = await jsonData.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // searching logic here
        searchProductByName: (state, action: PayloadAction<string>) => {
            const filteredProducts = state.products.filter((product) => {
                const lowerCaseTitle = product.title.toLowerCase();
                const lowerCaseCategory = product.category.name.toLowerCase();
                return lowerCaseTitle.includes(action.payload.toLowerCase()) || lowerCaseCategory.includes(action.payload.toLowerCase());
            });
            return {
                ...state,
                filteredProducts,
            };
        },
        // sorting logic here
        sortProducts: (state, action: PayloadAction<string>) => {
            const { products } = state;
            let sortedProducts = [...products];
            switch (action.payload) {
                case 'price-low-to-high':
                    sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high-to-low':
                    sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
                    break;
            }
            return {
                ...state,
                filteredProducts: sortedProducts,
            };
        },
        changeTheme: () => {
            // logic
        },
    },
    extraReducers(builder) {
        // success
        builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
            return {
                ...state,
                products: [],//action.payload,
                loading: false,
                error: null,
                filteredProducts: action.payload
            };
        });
        // loading
        builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        });
        // error
        builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
            return {
                ...state,
                loading: true,
                // error: action.error.message ?? "Failed to fetch products'",
                error: action.error.message || "Failed to fetch products'",
            };
        });
        // fetchSingleProduct.fulfilled
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.products.push(action.payload);
        });
    },
});

const ProductReducer = productSlice.reducer;
export const { searchProductByName, sortProducts } = productSlice.actions;
export default ProductReducer;