import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { CartProvider } from './CartContext';
import { ConfirmedOrderProvider } from './ConfirmedOrderContext';
import DarkNavbar from './DarkNavbar'
import Menu from './Menu';
import Home from './Home'
import Cart from './Cart'
import OrderConfirmation from './OrderConfirmation';
import '../Styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <ConfirmedOrderProvider>
        <CartProvider>
          <DarkNavbar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/menu' element={<Menu />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/confirmation' element={<OrderConfirmation />} />
          </Routes>
        </CartProvider>
      </ConfirmedOrderProvider>
    </BrowserRouter>
  );
}

export default App;
