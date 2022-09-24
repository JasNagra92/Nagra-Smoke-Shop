import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const MyAccount = () => {
  const [userOrders, setUserOrders] = useState();
  const { user } = useAuthContext();

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get("/myAccount", {
        headers: {
          authorization: "Bearer " + user.token,
        },
      });
      setUserOrders(response.data);
      console.log(response);
    };

    getOrders();
  }, []);

  return (
    <div style={{height:'100vh'}}>
      <div className="container">
          <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
              <tr style={{color:'white'}}>
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Pickup Date</th>
                <th>Total</th>
              </tr>
          </div>
      </div>
    </div>
  );
};
export default MyAccount;
