import { useAuthContext } from "./useAuthContext";
import { CartContext } from "../Components/CartContext";
import { useContext } from "react";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [ cart, setCart ] = useContext(CartContext)

  const logout = () => {

    // clear Cart on logout
    setCart([])

    // remove user from local storage
    localStorage.removeItem("user");

    // remove user from global state
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};

export default useLogout;
