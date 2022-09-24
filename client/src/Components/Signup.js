import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignup } from "../hooks/useSignup";
import styles from "../Styles/Auth.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuthContext()
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password);
  };

  useEffect(() => {
    if (user) {
      Navigate('/')
    }
  }, [ user ])

  return (
    <div className={styles.formContainer}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <h3 className={styles.Header}>Sign up</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div style={{ width: "25%", alignSelf: "end" }}>
          <button disabled={isLoading} className="btn btn-primary">
            Sign Up
          </button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};
export default Signup;
