import React from "react";
import { BsFillTrashFill } from 'react-icons/bs'
import styles from "../Styles/cartItem.module.css";

const CartItem = (props) => {
  const { name, quantity, price } = props.itemProps;
  const image = props.image
  const handleRemove = props.handleRemoveProps
  const item = props.itemProps
  
  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt="" />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.topHalf}>
          <p>{item.name}</p>
          <p>{(item.price * item.quantity).toLocaleString("en-US", {
                  style: "currency",
                  currency: "CAD",
                })}</p>
        </div>
        <div className={styles.bottomHalf}>
          <p>x{item.quantity}</p>
          <p 
          onClick={()=>handleRemove(item)}
          className={styles.removeIcon}>{<BsFillTrashFill />}</p>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
