import { useState } from "react";
import { AuthContext } from "../Components/authContext";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post("/signup", { email, password });
    if (response.data.error) {
      setIsLoading(false);
      setError(response.data.error);
    }
    // store user/jwt in local storage
    localStorage.setItem('user', JSON.stringify(response.data))

    // update authcontext
    dispatch({type: 'LOGIN', payload: response.data})

    setIsLoading(false)
  };

  return { signup, isLoading, error };
};
