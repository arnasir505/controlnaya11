import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { apiUrl } from '../../constants';
import { selectUser } from '../../store/users/usersSlice';
import Progress from '../../components/Progress/Progress';
import NotFound from '../../components/NotFound/NotFound';
import { Container, Divider, Typography } from '@mui/material';
import {
  selectDeleteProductLoading,
  selectProduct,
  selectProductError,
  selectProductLoading,
} from '../../store/product/productSlice';
import { deleteProduct, fetchProduct } from '../../store/product/productThunks';
import { LoadingButton } from '@mui/lab';

const ProductPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product = useAppSelector(selectProduct);
  const loading = useAppSelector(selectProductLoading);
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectProductError);
  const deleteLoading = useAppSelector(selectDeleteProductLoading);

  const getProduct = async () => {
    if (params.id) {
      await dispatch(fetchProduct(params.id));
    }
  };

  useEffect(() => {
    void getProduct();
  }, [params.id]);

  const onDelete = async (id: string) => {
    const confirmDelete = confirm('Delete this product?');
    if (confirmDelete) {
      await dispatch(deleteProduct(id));
      navigate('/');
    }
  };

  let content = <Progress />;

  if (!loading) {
    content = (
      <>
        <Divider sx={{ my: 2 }} />
        <img
          src={apiUrl + '/' + product.image}
          alt='img'
          style={{ maxWidth: '450px', height: 'auto' }}
        />
        <Typography variant='h3' sx={{ mb: 1 }}>
          ${product.price} USD
        </Typography>
        <Typography variant='h4'>{product.title}</Typography>
        <Typography variant='body1' sx={{ mt: 1, fontSize: '1.25rem' }}>
          {product.description}
        </Typography>
        <Typography
          color={'text.secondary'}
          sx={{ mt: 1, mb: 3 }}
          fontStyle='oblique'
        >
          {product.owner.displayName}, {product.owner.phoneNumber}
        </Typography>
        {user?._id === product.owner._id ? (
          <LoadingButton
            color='error'
            variant='contained'
            onClick={() => onDelete(product._id)}
            loading={deleteLoading}
          >
            Delete
          </LoadingButton>
        ) : null}
        <Divider sx={{ my: 2 }} />
      </>
    );
  }

  return <Container sx={{ py: 3 }}>{error ? <NotFound /> : content}</Container>;
};

export default ProductPage;
