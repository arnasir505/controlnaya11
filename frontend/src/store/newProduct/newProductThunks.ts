import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ProductMutation, ValidationError } from '../../types';
import { blobUrlToFile } from '../../utils';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';

export const addNewProduct = createAsyncThunk<
  void,
  undefined,
  { state: RootState; rejectValue: ValidationError }
>('newProduct/add', async (_, { getState, rejectWithValue }) => {
  try {
    const image = getState().newProduct.data.image;
    const token = getState().users.user?.token;

    const productMutation = getState().newProduct.data;

    const formData = new FormData();

    const keys = Object.keys(productMutation) as (keyof ProductMutation)[];

    keys.forEach(async (key) => {
      if (key === 'image') {
        const imageAsFile = await blobUrlToFile(image);
        formData.append('image', imageAsFile);
      }

      const value = productMutation[key];

      if (value !== null && key !== 'image') {
        formData.append(key, value);
      }
    });

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axiosApi.post('/products', formData, config);
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data as ValidationError);
    }

    throw error;
  }
});
