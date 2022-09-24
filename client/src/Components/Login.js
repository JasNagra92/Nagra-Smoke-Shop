import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useLogin from "../hooks/useLogin";
import styles from "../Styles/Auth.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };
  useEffect(() => {
    if(user) {
      navigate('/')
    }
  }, [ user ])

  return (
    <div className={styles.formContainer}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <h3 className={styles.Header}>Login</h3>
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
            Login
          </button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};
export default Login;
