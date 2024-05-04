import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../store/products/productsThunks';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import {
  selectProducts,
  selectProductsLoading,
} from '../../store/products/productsSlice';
import Progress from '../../components/Progress/Progress';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../constants';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);

  const getProducts = async () => {
    await dispatch(fetchProducts());
  };

  useEffect(() => {
    void getProducts();
  }, []);

  let content = <Progress />;

  if (products.length > 0 && !loading) {
    content = (
      <Grid container spacing={2} alignItems='stretch'>
        {products.map((product) => (
          <Grid item key={product._id} sx={{ display: 'flex' }}>
            <Link
              to={`/products/${product._id}`}
              style={{ textDecoration: 'none', display: 'flex' }}
            >
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardMedia
                  component={'img'}
                  image={apiUrl + '/' + product.image}
                  alt='img'
                  sx={{ width: 180, height: 180, objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant='h5' color='#000'>
                    {product.title}
                  </Typography>
                  <Typography
                    variant='body1'
                    fontWeight='bold'
                    color='#000'
                    sx={{ mt: 1 }}
                  >
                    ${product.price} dollars
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  } else if (products.length === 0 && !loading) {
    content = (
      <Typography variant='h5' textAlign={'center'} mt={3}>
        No products yet.
      </Typography>
    );
  }

  return (
    <Grid item xs={12} md={9}>
      {content}
    </Grid>
  );
};

export default Products;
