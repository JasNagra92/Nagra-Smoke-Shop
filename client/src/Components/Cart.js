import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../Styles/Cart.module.css";
import "../Styles/cart.css";
import axios from "axios";
import CustomerInfoForm from "./CustomerInfoForm";
import { addDays } from "date-fns";
axios.defaults.baseURL =
  process.env.REACT_APP_baseURL || "http://localhost:4000";

const Cart = () => {
  const [cart] = useContext(CartContext);
  const [order, setOrder] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: ''
  });
  const payload = { ...customerInfo, items: order, pickupDate: startDate };

  const handleInput = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const res = await fetch("/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: payload }),
    });
    const target = await res.json();
    window.location.href = target.url
  };

  useEffect(() => {
    const showOrder = async () => {
      try {
        const response = await axios.post("/api/cart", { cart });
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
              <label>Pickup Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={addDays(new Date(), 3)}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Pick a day for pickup"
              />
            </div>
            <div className={styles.totalDiv}>
              <button onClick={handleSubmit}>checkout</button>
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
