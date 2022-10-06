import { useAuthContext } from "./useAuthContext";
import { toast } from 'react-toastify'
import { CartContext } from "../Components/CartContext";
import { useContext } from "react";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [ cart, setCart ] = useContext(CartContext)

  const loggedOut = () => {
    toast.success("logged out, have a great day!")
  }

  const logout = () => {

    // clear Cart on logout
    setCart([])

    // remove user from local storage
    localStorage.removeItem("user");

    // remove user from global state
    dispatch({ type: "LOGOUT" });

    loggedOut()
  };

  return { logout };
};

export default useLogout;
