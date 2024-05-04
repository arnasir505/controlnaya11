import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import NotFound from './components/NotFound/NotFound';
import Register from './containers/Register/Register';

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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
