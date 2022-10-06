import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignup } from "../hooks/useSignup";
import PasswordChecklist from 'react-password-checklist'
import styles from "../Styles/Auth.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const { signup, error, isLoading } = useSignup();
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password, passwordConfirm, name, phoneNumber);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className={styles.formContainer}>
      <form className={styles.Form} onSubmit={(e) => handleSubmit(e)}>
        <h3 className={styles.Header}>Sign up</h3>
        <label>Full Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Phone Number:</label>
        <input
          type="number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
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
        <label>Confirm Password:</label>
        <input
          type="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        />
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={5}
          value={password}
          valueAgain={passwordConfirm}
          style={{color: 'white', opacity: 1}}
          className={styles.checklist}
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
