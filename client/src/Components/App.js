import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { CartProvider } from './CartContext';
import DarkNavbar from './DarkNavbar'
import Menu from './Menu';
import Home from './Home'
import Cart from './Cart'
import '../Styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <DarkNavbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/menu' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
