import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import NotFound from './components/NotFound/NotFound';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';

const App = () => {
  return (
    <>
      <header>
        <Appbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={'Home'} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
