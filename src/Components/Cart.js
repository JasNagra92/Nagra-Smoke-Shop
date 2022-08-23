import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import styles from "../Styles/Cart.module.css";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  return (
    <div className={styles.cartContainer}>
        <table>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Quanitity</th>
            <th>Price</th>
          </tr>
          {cart.map((item) => {
            return <tr>
                <td></td>
                <td>{item.name}</td>
                <td></td>
                <td></td>
                <td>${item.price}</td>
            </tr>
          })}
        </table>
    </div>
  );
};
export default Cart;
