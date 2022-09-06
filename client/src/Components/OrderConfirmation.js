import { useEffect, useState } from "react";
import axios from 'axios'
import styles from "../Styles/OrderConfirmation.module.css";
import { format } from 'date-fns'

const OrderConfirmation = () => {
  const [confirmedOrder, setConfirmedOrder] = useState();
  // this page will be rendered on redirect after successfull checkout session
  // server side route appends the checkout session ID to the URL upon
  // successfull redirect, that id is then used to fetch the corresponding
  // order from mongoDB and then display it on the thank you page
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    const setOrder = async () => {
      try {
        const response = await axios.get("/checkout-session?id=" + id);
        setConfirmedOrder(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    setOrder();
  }, []);

  return (
    <div className={styles.mainContainer}>
      {confirmedOrder && (
        <div className="container">
          <div className={styles.receiptContainer}>
            <div className={styles.thankYou}>
              <h3>Thank you for your order {confirmedOrder.name}</h3>
            </div>
            <div className={styles.checkInbox}>
              check your inbox for confirmation email
            </div>
            <div className={styles.orderDetails}>
              Order Number - {confirmedOrder.orderNumber}
            </div>

            <div className={styles.total}>
              <h5>Order Total</h5>
              <p>$ 100.00</p>
            </div>
            <div className={styles.date}>
              <h5>Order Date</h5>
              <p>10-10-2022 10:30</p>
            </div>
            <div className={styles.method}>
              <h5>Payment Method</h5>
              <p>card</p>
            </div>

            <div className={styles.email}>
              <h5>Email</h5>
              <p>test@hotmail.com</p>
            </div>
            <div className={styles.pdate}>
              <h5>Pick up Date</h5>
              <p>{format(new Date(`${confirmedOrder.pickupDate}`), 'MM/dd/yyyy H:mm')}</p>
            </div>
            <div className={styles.delivery}>
              <h5>Delivery Option</h5>
              <p>frozen</p>
            </div>

            <div className={styles.footer}></div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderConfirmation;