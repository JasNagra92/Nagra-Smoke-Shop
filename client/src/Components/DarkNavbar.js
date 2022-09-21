import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { CartContext } from "./CartContext";
import styles from "../Styles/Nav.module.css";
import useLogout from "../hooks/useLogout";

const DarkNavbar = () => {
  // import cart from context provider to update number of items
  const [cart, setCart] = useContext(CartContext);
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="container">
      <div className={styles.NavContainer}>
        <div className={styles.Logo}>
          <h5>
            <span id={styles.nagra}>nagra</span> SMOKE HOUSE
          </h5>
        </div>
        <div className={styles.links}>
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.activeClassName : undefined
              }
            >
              <p className={styles.link}>HOME</p>
            </NavLink>
          </div>
          <div>
            <p>RESERVATION</p>
          </div>
          <div>
            <p>ABOUT US</p>
          </div>
          <div>
            <p>GALLERY</p>
          </div>
          <div>
            <p>SERVICES</p>
          </div>
          <div>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? styles.activeClassName : undefined
              }
            >
              <p>MENU</p>
            </NavLink>
          </div>
          <div>
            <p>TEAM</p>
          </div>
          <div>
            <p>BLOG</p>
          </div>
          <div>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.activeClassName : undefined
              }
            >
              <p>Login</p>
            </NavLink>
          </div>
          <div
            className={({ isActive }) =>
              isActive ? styles.activeClassName : undefined
            }
          >
            <button onClick={handleClick}>Logout</button>
          </div>
          <div>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? styles.activeClassName : undefined
              }
            >
              <p>Signup</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? styles.activeClassName : undefined
              }
            >
              <BsFillCartFill size={"30px"} />
              <div className={styles.cart}>{cart.length}</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DarkNavbar;
