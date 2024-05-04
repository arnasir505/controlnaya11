import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ProductExpanded } from '../../types';
import { deleteProduct, fetchProduct } from './productThunks';

interface ProductState {
  data: ProductExpanded;
  loading: boolean;
  error: boolean;
  deleteLoading: boolean;
}

const initialState: ProductState = {
  data: {
    _id: '',
    title: '',
    image: '',
    description: '',
    price: '',
    owner: {
      _id: '',
      displayName: '',
      phoneNumber: '',
    },
    category: '',
  },
  loading: false,
  error: false,
  deleteLoading: false,
};

const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.data = {
        _id: '',
        title: '',
        image: '',
        description: '',
        price: '',
        owner: {
          _id: '',
          displayName: '',
          phoneNumber: '',
        },
        category: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchProduct.fulfilled, (state, { payload: product }) => {
        state.loading = false;
        state.data = product;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleteLoading = true;
        state.error = false;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.deleteLoading = false;
        state.error = true;
      });
  },
});

export const productReducer = productSlice.reducer;
export const { clearProduct } = productSlice.actions;

export const selectProduct = (state: RootState) => state.product.data;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductError = (state: RootState) => state.product.error;
export const selectDeleteProductLoading = (state: RootState) =>
  state.product.deleteLoading;
