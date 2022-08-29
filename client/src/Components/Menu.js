import React, { useState, useContext, useEffect} from "react";
import { CartContext } from "./CartContext";
import axios from 'axios'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import brisket from "../Images/brisket.jpg";
import pork from "../Images/Pork-Butt.jpg";
import rib from "../Images/PrimeRib.jpg";
import styles from "../Styles/Menu.module.css";
axios.defaults.baseURL = process.env.REACT_APP_baseURL || 'http://localhost:4000'

const Menu = () => {
  const [cart, setCart] = useContext(CartContext);
  const [menuItems,setMenuItems] = useState([]);
// use effect will retrieve items and their prices from the server to prevent price
// manipulation and set them in state variable
  useEffect(()=>{
    const getMenuItems = async () => {
      let data = await axios.get('/api/menu')
      setMenuItems(data.data.result)
    }
    getMenuItems()
  }, [])
// on click will set the menu items in cart but only their _ids,
// only _ids will be sent to server then prices will be fetched from mongoDB
  const handleClick = (item) => {
    setCart([...cart, item]);
  };
  return (
    <div className={styles.menuContainer}>
      <div className="container">
        <div className="row p-5">
          <div className="d-flex justify-content-evenly">
            <div>
              <Card bg="dark" text="light" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={brisket} />
                <Card.Body>
                  <Card.Title>10 lb Smoked Brisket</Card.Title>
                  <Card.Text>
                    10lb Brisket smoked for 12 hours with Applewood pellets
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleClick(menuItems[0])}
                  >
                    Add to Cart
                  </Button>
                  <h5>Stock available: {menuItems[0].stock}</h5>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <div className="row p-5">
          <div className="d-flex justify-content-evenly">
            <div>
              <Card bg="dark" text="light" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={pork} />
                <Card.Body>
                  <Card.Title>10 lb Pulled Pork</Card.Title>
                  <Card.Text>
                    10lb Boston Butt smoked for 12 hours with Applewood pellets
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleClick(menuItems[1])}
                  >
                    Add to Cart
                  </Button>
                  <h5>Stock available: {menuItems[1].stock}</h5>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card bg="dark" text="light" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={rib} />
                <Card.Body>
                  <Card.Title>6lb Prime Rib Roast</Card.Title>
                  <Card.Text>
                    6lb Prime Rib smoked for 12 hours with Applewood pellets
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleClick(menuItems[2])}
                  >
                    Add to Cart
                  </Button>
                  <h5>Stock available: {menuItems[2].stock}</h5>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Menu;
