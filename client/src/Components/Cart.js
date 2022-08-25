import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from './CartContext';
import styles from '../Styles/Cart.module.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
axios.defaults.baseURL =
  process.env.REACT_APP_baseURL || 'http://localhost:4000';

const Cart = () => {
  const [cart] = useContext(CartContext);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const showOrder = async () => {
      try {
        const response = await axios.post('/api/cart', { cart });
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    showOrder();
  }, []);

  return (
    <div>
      <div className={styles.heading}>
        <h2>Your Order</h2>
      </div>
      <div className={styles.cartContainer}>
        <div className={styles.cartDiv}>
          <div className={styles.tableDiv}>
            <table className={styles.table}>
              <tr>
                <th>Name</th>
                <th>Weight</th>
                <th>Price</th>
              </tr>
              {order.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td></td>
                    <td>${item.price}</td>
                  </tr>
                );
              })}
            </table>
            <div className={styles.totalDiv}>
              <Button>
                Checkout
              </Button>
              <h4>Total: </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
