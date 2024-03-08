import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

import { Product } from "../../misc/type";
import { API_BASE_URL } from '../../utils/apiUtils';

const url = API_BASE_URL + 'products';

type InitialState = {
    products: Product[];
    loading: boolean;
    error: string | null;
};

const initialState: InitialState = {
    products: [],
    loading: false,
    error: null,
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

export const submitAddProduct = createAsyncThunk(
    'submitAddProduct',
    async (formData: { title: string; price: string; description: string; categoryId: string; images: string[] }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}`, formData);
            toast.success('Product successfully added!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const submitEditProduct = createAsyncThunk(
    'submitEditProduct',
    async ({ productId, formData }: { productId: string, formData: { title: string; price: string; images: string[] } }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${url}/${productId}`, formData);
            toast.success('Product successfully Updated!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (productId: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`${url}/${productId}`, {
                method: "DELETE",
            });
            const data: boolean = await response.json();
            return data;
        } catch (e) {
            const error = e as Error;
            return rejectWithValue(error.message);
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
                products: filteredProducts,
            };
        },
        // sorting logic here
        sortProducts: (state, action: PayloadAction<string>) => {
            const { products } = state;
            let sortedProducts = [...products];
            switch (action.payload) {
                case 'default':
                    // No sorting needed for the default case, so leave sortedProducts unchanged
                    break;
                case 'price-low-to-high':
                    sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high-to-low':
                    sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
                    break;
            }
            return {
                ...state,
                products: sortedProducts,
            };
        },
        changeTheme: () => {
            // logic
        },
    },
    extraReducers(builder) {
        // fetchAllProductsAsync || success
        builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null,
            };
        });
        // fetchAllProductsAsync || loading
        builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        });
        // fetchAllProductsAsync || error
        builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
            return {
                ...state,
                loading: true,
                error: action.error.message || "Failed to fetch products'",
            };
        });
        // fetchSingleProduct || fulfilled
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            // state.products.push(action.payload);
            return {
                ...state,
                products: action.payload,
            };
        });

        // submitAddProduct || success
        builder.addCase(submitAddProduct.fulfilled, (state, action) => {
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null,
            };
        });
        // submitAddProduct || loading
        builder.addCase(submitAddProduct.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        });
        // submitAddProduct || error
        builder.addCase(submitAddProduct.rejected, (state, action) => {
            return {
                ...state,
                loading: true,
                error: action.error.message || "Failed to fetch products'",
            };
        });

        // submitEditProduct || success
        builder.addCase(submitEditProduct.fulfilled, (state, action) => {
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null,
            };
        });
        // submitEditProduct || loading
        builder.addCase(submitEditProduct.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        });
        // submitEditProduct || error
        builder.addCase(submitEditProduct.rejected, (state, action) => {
            return {
                ...state,
                loading: true,
                error: action.error.message || "Failed to fetch products'",
            };
        });

        // deleteProduct || fulfilled
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== action.meta.arg
                ),
                loading: false,
                error: null,
            };
        });

        // deleteProduct || pending
        builder.addCase(deleteProduct.pending, (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        });

        // deleteProduct || rejected
        builder.addCase(deleteProduct.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.error.message ?? "error",
            };
        });
    },
});

const ProductReducer = productSlice.reducer;
export const { searchProductByName, sortProducts } = productSlice.actions;
export default ProductReducer;