import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const [isloading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    const response = await axios.post("/login", { email, password });

    if (response.data.error) {
      setLoading(false);
      setError(response.data.error);
      return
    }
    // set user in localStorage
    localStorage.setItem("user", JSON.stringify(response.data));

    // set user in global auth context
    dispatch({ type: "LOGIN", payload: response.data });

    setLoading(false);
  };

  return { login, isloading, error };
};
export default useLogin;
