import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductExpanded } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const fetchProduct = createAsyncThunk<ProductExpanded, string>(
  'product/fetch',
  async (id) => {
    try {
      const response = await axiosApi.get<ProductExpanded>(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('product/delete', async (id, { getState }) => {
  try {
    const token = getState().users.user?.token;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axiosApi.delete(`/products/${id}`, config);
  } catch (error) {
    throw error;
  }
});
