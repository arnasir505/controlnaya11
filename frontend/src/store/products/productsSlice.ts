import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsThunks';
import { RootState } from '../../app/store';
import { Product } from '../../types';

interface ProductsState {
  items: Product[];
  category: string;
  loading: boolean;
  error: boolean;
}

const initialState: ProductsState = {
  items: [],
  category: '',
  loading: false,
  error: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload: products }) => {
        state.loading = false;
        state.items = products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) => state.products.loading;
