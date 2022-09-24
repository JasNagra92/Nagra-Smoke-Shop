import { Routes, Route, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import Menu from "./Menu";
import Home from "./Home";
import Cart from "./Cart";
import OrderConfirmation from "./OrderConfirmation";
import Cancelled from "./Cancelled";
import Signup from "./Signup";
import Login from "./Login";

import { AnimatePresence } from "framer-motion";
import MyAccount from "./MyAccount";

const AnimatedRoutes = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" />} />
        <Route path="/success" element={<OrderConfirmation />} />
        <Route path="/cancelled=true" element={<Cancelled />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myAccount" element={user? <MyAccount /> : <Navigate to='/login' />} />
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;
