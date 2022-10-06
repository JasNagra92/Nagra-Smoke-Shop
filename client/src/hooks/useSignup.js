import { useState } from "react";
import { toast } from 'react-toastify'
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signedUp = () => {
    toast.success("Signed Up Successfully! Check email for Confirmation")
  }

  const signup = async (email, password, passwordConfirm, name, phoneNumber) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post("/signup", { email, password, passwordConfirm, name, phoneNumber });
    if (response.data.error) {
      setIsLoading(false);
      setError(response.data.error);
      return
    }
    // store user/jwt in local storage
    localStorage.setItem("user", JSON.stringify(response.data));

    // update authcontext
    dispatch({ type: "LOGIN", payload: response.data });

    setIsLoading(false);

    signedUp()
  };

  return { signup, isLoading, error };
};
