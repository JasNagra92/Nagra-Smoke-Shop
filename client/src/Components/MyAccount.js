import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import OrderDisplay from "./OrderDisplay";
import styles from '../Styles/MyAccount.module.css'

const MyAccount = () => {
  const [userOrders, setUserOrders] = useState();
  const [loaded, setLoaded] = useState(false)
  const { user } = useAuthContext();

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get("/myAccount", {
        headers: {
          authorization: "Bearer " + user.token,
        },
      });
      setUserOrders(response.data.orders);
      setLoaded(true)
      console.log(response);
    };

    getOrders();
  }, []);

  return (
    <div style={{height:'100vh'}}>
      <div className="container">
          <div className={styles.displayContainer}>
              <div className={styles.headingsContainer}>
                <p>Order Number</p>
                <p>Order Date</p>
                <p>Pickup Date</p>
                <p>Total</p>
              </div>
              {loaded ? userOrders.map(order => {
                return <OrderDisplay orderProps={order} />
              }): <div>loading orders</div>}
          </div>
      </div>
    </div>
  );
};
export default MyAccount;
