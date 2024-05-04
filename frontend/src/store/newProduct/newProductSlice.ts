import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductMutation, ValidationError } from '../../types';
import { addNewProduct } from './newProductThunks';
import { RootState } from '../../app/store';

interface NewProductState {
  data: ProductMutation;
  filename: string;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: NewProductState = {
  data: {
    title: '',
    description: '',
    image: '',
    price: '',
    category: '',
  },
  filename: '',
  createLoading: false,
  createError: null,
};

const newProductSlice = createSlice({
  name: 'newProduct',
  initialState,
  reducers: {
    updateTitle: (state, { payload: title }: PayloadAction<string>) => {
      state.data.title = title;
    },
    updateDescription: (
      state,
      { payload: description }: PayloadAction<string>
    ) => {
      state.data.description = description;
    },
    updateImage: (state, { payload: image }: PayloadAction<string>) => {
      state.data.image = image;
    },
    updateFilename: (state, { payload: filename }: PayloadAction<string>) => {
      state.filename = filename;
    },
    updatePrice: (state, { payload: price }: PayloadAction<string>) => {
      state.data.price = price;
    },
    updateCategory: (state, { payload: category }: PayloadAction<string>) => {
      state.data.category = category;
    },
    clearImage: (state) => {
      state.data.image = '';
    },
    clearForm: (state) => {
      state.data = {
        title: '',
        description: '',
        image: '',
        price: '',
        category: '',
      };
      state.filename = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.createError = null;
        state.createLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(addNewProduct.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        state.createError = error || null;
      });
  },
});

export const newProductReducer = newProductSlice.reducer;
export const {
  updateTitle,
  updateDescription,
  updateImage,
  updateFilename,
  updatePrice,
  updateCategory,
  clearImage,
  clearForm,
} = newProductSlice.actions;

export const selectNewProduct = (state: RootState) => state.newProduct.data;
export const selectNewProductImageName = (state: RootState) =>
  state.newProduct.filename;
export const selectNewProductCreateLoading = (state: RootState) =>
  state.newProduct.createLoading;
export const selectNewProductCreateError = (state: RootState) =>
  state.newProduct.createError;
