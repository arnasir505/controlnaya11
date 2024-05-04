import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import NotFound from './components/NotFound/NotFound';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import NewProduct from './containers/NewProduct/NewProduct';
import Products from './containers/Products/Products';
import Sidebar from './components/Sidebar/Sidebar';
import { Container, Grid } from '@mui/material';
import ProductPage from './containers/ProductExpanded/ProductExpanded';

const App = () => {
  return (
    <>
      <header>
        <Appbar />
      </header>
      <Container>
        <Grid container sx={{ py: 5 }}>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/new-product' element={<NewProduct />} />
            <Route path='/products/:id' element={<ProductPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Grid>
      </Container>
    </>
  );
};

export default App;
