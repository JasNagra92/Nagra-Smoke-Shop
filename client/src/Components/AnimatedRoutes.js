import { Routes, Route, useLocation } from "react-router-dom";
import Menu from "./Menu";
import Home from "./Home";
import Cart from "./Cart";
import OrderConfirmation from "./OrderConfirmation";
import Cancelled from "./Cancelled";

import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<OrderConfirmation />} />
        <Route path="/cancelled=true" element={<Cancelled />} />
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;
