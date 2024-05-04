import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { CATEGORIES } from '../../constants';
import { useAppDispatch } from '../../app/hooks';
import { setCategory } from '../../store/products/productsSlice';
import { fetchProducts } from '../../store/products/productsThunks';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const fetchProductsByCategory = async (category: string) => {
    if (pathname !== '/') {
      navigate('/');
    }
    dispatch(setCategory(category));
    await dispatch(fetchProducts());
  };

  return (
    <Grid item xs={12} md={3}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => fetchProductsByCategory('')}>
            <Typography sx={{ color: '#388e3c' }}>All products</Typography>
          </ListItemButton>
        </ListItem>
        {CATEGORIES.map((category) => (
          <ListItem key={category.name} disablePadding>
            <ListItemButton
              onClick={() => fetchProductsByCategory(category.value)}
            >
              <Typography sx={{ color: '#388e3c' }}>{category.name}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default Sidebar;
