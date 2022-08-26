import React, { useState, useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { CartContext } from './CartContext';
import styles from '../Styles/Cart.module.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import CustomerInfoForm from './CustomerInfoForm';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

axios.defaults.baseURL =
  process.env.REACT_APP_baseURL || 'http://localhost:4000';

const Cart = () => {
  const [cart] = useContext(CartContext);
  const [disabled, setDisabled] = useState(true);
  const [order, setOrder] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [customerInfo, setCustomerInfo] = useState({
    fname: '',
    lname: '',
    street_address: '',
    city: '',
    postal_code: '',
  });
  let navigate = useNavigate();

  const handleInput = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (
      !customerInfo.fname ||
      !customerInfo.lname ||
      !customerInfo.street_address ||
      !customerInfo.city ||
      !customerInfo.postal_code
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [customerInfo]);

  const handleSubmit = async () => {
    try {
      console.log(order);
      let payload;
      payload = {
        ...customerInfo,
        items: order,
      };
      const response = await axios.post('/api/order', { payload });
      console.log(response);
      navigate('/confirmation')
    } catch (error) {
      console.log(error);
    }
  };

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
            <div className={styles.customerForm}>
              <CustomerInfoForm
                handleInput={handleInput}
                customerInfo={customerInfo}
              />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={addDays(new Date(), 3)}
              />
            </div>
            <div className={styles.totalDiv}>
              {disabled ? (
                <button disabled>Checkout</button>
              ) : (
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Checkout
                </Button>
              )}
              <h4>
                Total: $
                {order.reduce((total, current) => total + current.price, 0)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
