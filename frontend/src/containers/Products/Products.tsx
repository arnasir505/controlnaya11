import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { fetchProducts } from '../../store/products/productsThunks';
import { Grid } from '@mui/material';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();

  const getProducts = async () => {
    await dispatch(fetchProducts());
  };

  useEffect(() => {
    void getProducts();
  }, []);

  return <Grid item xs={12} md={9}>Products</Grid>;
};

export default Products;
