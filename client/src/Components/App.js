import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./authContext";
import DarkNavbar from "./DarkNavbar";
import "../Styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <CartProvider>
          <div class="background">
            <div class="overlay">
              <ToastContainer autoClose={2000} />
              <DarkNavbar />
              <AnimatedRoutes />
            </div>
          </div>
        </CartProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;