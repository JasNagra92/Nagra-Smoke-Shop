import React from "react";
import styles from "../Styles/cartItem.module.css";
import { motion } from "framer-motion";

const CartItem = (props) => {
  const { name, quantity, price } = props.itemProps;

  return (
    <div className={styles.cartItem}>
      <div>
        <p>{name}</p>
      </div>
      <div className={styles.qpContainer}>
        <p>{quantity} X</p>
        <p>${price}</p>
        <button
          className={styles.btn}
          onClick={() => props.handleRemoveProps(props.itemProps)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default CartItem;
