import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./CartContext";
import DarkNavbar from "./DarkNavbar";
import "../Styles/App.css";
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div class="background">
          <div class="overlay">
            <DarkNavbar />
            <AnimatedRoutes />
          </div>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
