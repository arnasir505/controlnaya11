import React, { useEffect } from 'react';
import FileInput from '../../components/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearForm,
  selectNewProduct,
  selectNewProductCreateError,
  selectNewProductCreateLoading,
  updateCategory,
  updateDescription,
  updateImage,
  updatePrice,
  updateTitle,
} from '../../store/newProduct/newProductSlice';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../store/users/usersSlice';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { addNewProduct } from '../../store/newProduct/newProductThunks';
import { CATEGORIES } from '../../constants';

const NewProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const newProduct = useAppSelector(selectNewProduct);
  const loading = useAppSelector(selectNewProductCreateLoading);
  const error = useAppSelector(selectNewProductCreateError);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      const localImageUrl = window.URL.createObjectURL(files[0]);
      dispatch(updateImage(localImageUrl));
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addNewProduct()).unwrap();
    dispatch(clearForm());
    navigate('/');
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container sx={{ py: 3 }} maxWidth='md'>
      <Typography variant='h4' sx={{ mb: 2 }}>
        Add product
      </Typography>
      <Box component='form' onSubmit={onFormSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              type='text'
              name='title'
              label='Title'
              value={newProduct.title}
              onChange={(e) => dispatch(updateTitle(e.target.value))}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              type='text'
              name='description'
              label='Description'
              rows={5}
              value={newProduct.description}
              onChange={(e) => dispatch(updateDescription(e.target.value))}
              error={Boolean(getFieldError('description'))}
              helperText={getFieldError('description')}
            />
          </Grid>
          <Grid item xs={12}>
            <FileInput
              onChange={fileInputChangeHandler}
              name='image'
              label='Image'
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              sx={{ minWidth: 200 }}
              error={Boolean(getFieldError('category'))}
            >
              <InputLabel>Select Category</InputLabel>
              <Select
                required
                autoWidth
                name='category'
                value={newProduct.category}
                label='Select Category'
                onChange={(e) => dispatch(updateCategory(e.target.value))}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem value={category.value} key={category.value}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{getFieldError('category')}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth={false}
              type='number'
              name='price'
              label='Price'
              value={newProduct.price}
              onChange={(e) => dispatch(updatePrice(e.target.value))}
              error={Boolean(getFieldError('price'))}
              helperText={getFieldError('price')}
            />
          </Grid>
          <Grid item>
            <LoadingButton type='submit' variant='contained' loading={loading}>
              <span>Save</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NewProduct;
