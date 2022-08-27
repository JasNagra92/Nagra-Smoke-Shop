import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

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
const stripePromise = loadStripe(
  "pk_test_51Lb9wkAAgyKcvNJTbuAGKXtD8UAhxfj2FQznLCWYq5nObuiZIDfuTygsXYmvcMVRnpTUxSQdJOuudy74cDcZUA2G004ymPeyIJ"
);

const Cart = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [cart] = useContext(CartContext);
  const [showPayForm, setShowPayForm] = useState(false);
  const [order, setOrder] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    fname: "",
    lname: "",
    street_address: "",
    city: "",
    postal_code: "",
  });
  const payload = { ...customerInfo, items: order, deliveryDate: startDate };

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
      setShowPayForm(false);
    } else {
      setShowPayForm(true);
    }
  }, [customerInfo]);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

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

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

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
              {clientSecret && showPayForm && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm order={payload} />
                </Elements>
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
