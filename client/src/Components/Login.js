import { useState } from "react";
import styles from '../Styles/Auth.module.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
  };

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
          <div style={{width: '25%', alignSelf: 'end'}}><button className='btn btn-primary'>Login</button></div>
        </form>
    </div>
  );
};
export default Login;
