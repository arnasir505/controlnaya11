import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Progress: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={'3rem'} sx={{ mt: 2 }} color='warning' />
    </Box>
  );
};

export default Progress;
