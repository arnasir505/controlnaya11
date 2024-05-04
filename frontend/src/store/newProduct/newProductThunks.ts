import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ValidationError } from '../../types';
import { blobUrlToFile } from '../../utils';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';

export const addNewProduct = createAsyncThunk<
  void,
  undefined,
  { state: RootState; rejectValue: ValidationError }
>('newProduct/add', async (_, { getState, rejectWithValue }) => {
  try {
    const title = getState().newProduct.data.title;
    const description = getState().newProduct.data.description;
    const image = getState().newProduct.data.image;
    const category = getState().newProduct.data.category;
    const price = getState().newProduct.data.price;
    const token = getState().users.user?.token;

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);

    const imageAsFile = await blobUrlToFile(image);
    formData.append('image', imageAsFile);

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
