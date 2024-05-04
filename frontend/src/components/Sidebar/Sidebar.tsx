import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { CATEGORIES } from '../../constants';

const Sidebar: React.FC = () => {
  return (
    <Grid item xs={12} md={3}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Typography sx={{ color: '#388e3c' }}>All products</Typography>
          </ListItemButton>
        </ListItem>
        {CATEGORIES.map((category) => (
          <ListItem key={category.name} disablePadding>
            <ListItemButton>
              <Typography sx={{ color: '#388e3c' }}>{category.name}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default Sidebar;
