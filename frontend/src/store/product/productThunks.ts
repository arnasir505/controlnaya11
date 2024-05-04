import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductExpanded } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchProduct = createAsyncThunk<ProductExpanded, string>(
  'fullPost/fetch',
  async (id) => {
    try {
      const response = await axiosApi.get<ProductExpanded>(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
