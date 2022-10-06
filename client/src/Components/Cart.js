import React, { useState, useContext, useEffect } from "react";
import CartItem from "../Components/CartItem";
import { CartContext } from "./CartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../Styles/Cart.module.css";
import axios from "axios";
import CustomerInfoForm from "./CustomerInfoForm";
import smPork from "../Images/Pork-Butt-small.jpg";
import smBrisket from "../Images/brisket-small.jpeg";
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
  const { user } = useAuthContext();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
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

  const fillInfo = () => {
    setCustomerInfo({
      name: `${user.foundUser.name}`,
      email: `${user.foundUser.email}`,
      phoneNumber: `${user.foundUser.phoneNumber}`,
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
    setCustomerInfo({ ...customerInfo, email: user.user.email });
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
        <div className={styles.mainContainer}>
          <div className="container">
            <h3 className={styles.heading}>Checkout Summary</h3>
            <div className={styles.contentContainer}>
              <div className={styles.formContainer}>
                <CustomerInfoForm
                  customerInfo={customerInfo}
                  handleInput={handleInput}
                  fillInfo={fillInfo}
                />
              </div>
              <div className={styles.itemAndTotalContainer}>
                <div>
                  {order.map((item) => (
                    <div className={styles.menuItem}>
                      <CartItem
                        image={item.name === "Brisket" ? smBrisket : smPork}
                        key={item._id}
                        itemProps={item}
                        handleRemoveProps={handleRemove}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.totalContainer}>
                  <div className={styles.total}>
                    <h5>Total</h5>
                    <p>$100</p>
                  </div>
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

{
  /* <DatePicker
selected={startDate}
onChange={(date) => setStartDate(date)}
minDate={addDays(new Date(), 4)}
excludeDates={disabledDates}
showTimeSelect
minTime={setHours(setMinutes(new Date(), 0), 18)}
maxTime={setHours(setMinutes(new Date(), 0), 22)}
timeFormat="HH:mm"
dateFormat="MMMM,d,yyyy h:mm aa"
placeholderText="Pick a day for pickup"
/>
          {order.map((item) => (
            <CartItem
              key={item._id}
              itemProps={item}
              handleRemoveProps={handleRemove}
            />
          ))}

          <button
          className={styles.cartBtn}
          onClick={handleSubmit}
          disabled={disableBtn}
        >
          checkout
        </button> */
}
