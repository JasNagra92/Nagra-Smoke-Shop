import React, { useState, useContext, useEffect } from "react";
import CartItem from "../Components/CartItem";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../Styles/Cart.module.css";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import CustomerInfoForm from "./CustomerInfoForm";
import { addDays, setHours, setMinutes } from "date-fns";
const qs = require("qs");

// react_app_baseURL is env variable provided by heroku on hosting
axios.defaults.baseURL =
  process.env.REACT_APP_baseURL || "http://localhost:4000";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [disableBtn, setDisableBtn] = useState(true);
  const [order, setOrder] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
  });

  const errorToast = () => {
    toast.error("not enough stock to complete order :(");
  };

  // payload will be used in fetch request to send order information to server
  const payload = { ...customerInfo, items: order, pickupDate: startDate };

  const handleInput = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };
  // disable checkout button until all fields are flled in
  useEffect(() => {
    if (customerInfo.email && customerInfo.name && startDate) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [customerInfo, startDate]);

  // send cart information along with customer info to server to create stripe checkout session
  // this will redirect the user to the url sent in the response from the server
  const handleSubmit = async () => {
    const response = await axios.post("/create-checkout-session", { payload });
    const data = response.data;
    if (data.error) {
      errorToast();
    } else {
      const target = data.url;
      window.location.href = target;
    }
  };

  const handleRemove = (item) => {
    setOrder(
      order.filter((orderItem) =>
        orderItem._id === item._id ? false : orderItem
      )
    );
    setCart(
      cart.filter((cartItem) => (cartItem._id === item._id ? false : cartItem))
    );
  };

  // on component mount, request to server with cart item _ids will fetch the prices from server
  // in order to render them on the cart summary
  useEffect(() => {
    const showOrder = async () => {
      try {
        const response = await axios.get("/api/cart", {
          params: { cart: cart },
          paramsSerializer: (params) => {
            return qs.stringify(params);
          },
        });
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (cart.length > 0) {
      showOrder();
    }
  }, []);

  // function returns an array of Date objects made from list of
  // dates recieved from the server through a Get request that
  // queries the database of existing orders and sends back
  // existing pick up dates
  const formattedDates = (array) => {
    let excludedDates = [];
    for (const date of array) {
      excludedDates.push(new Date(date));
    }
    return excludedDates;
  };

  // on component mount get requeset recieves existing orders
  // pick up dates and stores them in disabled dates state array
  // to be given to react date picker to disable those dates
  // to prevent 2 orders being picked up on the same day, smoker
  // is too small to time multiple pick ups on same day
  useEffect(() => {
    const getDates = async () => {
      const response = await axios.get("/getExcludedDates");

      setDisabledDates(formattedDates(response.data));
    };
    getDates();
  }, []);

  return (
    <div>
      {cart.length === 0 ? (
        <div style={{ height: "100vh", color: "white", textAlign: "center" }}>
          <p>Cart is empty!</p>
        </div>
      ) : (
        <div>
          <div className={styles.heading}>
            <h2>Your Order</h2>
          </div>
          <div className={styles.cartContainer}>
            <div className={styles.cartDiv}>
              <div className={styles.tableDiv}>
                <div className={styles.headingsContainer}>
                  <div>
                    <p className={styles.cartHeadings}>Item</p>
                  </div>
                  <div className={styles.qpContainer}>
                    <p className={styles.cartHeadings}>Quantity</p>
                    <p className={styles.cartHeadings}>Price</p>
                  </div>
                </div>
                {order.map((item) => (
                  <AnimatePresence>
                    <CartItem
                      key={item._id}
                      itemProps={item}
                      handleRemoveProps={handleRemove}
                    />
                  </AnimatePresence>
                ))}
                <div className={styles.totalDiv}>
                  <button
                    className={styles.cartBtn}
                    onClick={handleSubmit}
                    disabled={disableBtn}
                  >
                    checkout
                  </button>
                  <h4 className={styles.total}>
                    Total: $
                    {order.reduce(
                      (total, current) =>
                        total + current.price * current.quantity,
                      0
                    )}
                  </h4>
                </div>
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
                    excludeDates={disabledDates}
                    showTimeSelect
                    minTime={setHours(setMinutes(new Date(), 0), 8)}
                    maxTime={setHours(setMinutes(new Date(), 0), 21)}
                    timeFormat="HH:mm"
                    dateFormat="MMMM,d,yyyy h:mm aa"
                    placeholderText="Pick a day for pickup"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
