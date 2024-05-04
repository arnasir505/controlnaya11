import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { Product } from '../../types';

export const fetchProducts = createAsyncThunk<
  Product[],
  undefined,
  { state: RootState }
>('products/fetchAll', async (_, { getState, dispatch }) => {
  try {
    const category = getState().products.category;
    const response = await axiosApi.get<Product[]>(`/products?category=${category}`);
    // dispatch(clearFullProduct());
    return response.data;
  } catch (error) {
    throw error;
  }
});
