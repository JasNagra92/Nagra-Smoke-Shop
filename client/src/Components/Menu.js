import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { useAuthContext } from '../hooks/useAuthContext';
import { motion } from "framer-motion";
import { Puff } from "react-loader-spinner";
import { toast } from "react-toastify";
import Modal from './Modal'
import axios from "axios";
import brisket from "../Images/brisket.jpg";
import pork from "../Images/Pork-Butt.jpg";
import chicken from '../Images/chicken.jpg'
import styles from "../Styles/Menu.module.css";
import MenuItem from "./MenuItem";
axios.defaults.baseURL =
  process.env.REACT_APP_baseURL || "http://localhost:4000";

const Menu = () => {
  const [cart, setCart] = useContext(CartContext);
  const [menuItems, setMenuItems] = useState();
  const [openModal, setOpenModal] = useState(false)
  const {user} = useAuthContext()

  // use effect will retrieve items and their prices from the server to prevent price
  // manipulation and set them in state variable
  useEffect(() => {
    const getMenuItems = async () => {
      const data = await axios.get("/api/menu");
      const menuArray = data.data.result;
      const menu = menuArray.map((menuItem) => {
        return { ...menuItem, quantity: 1 };
      });
      setMenuItems(menu);
    };
    getMenuItems();
  }, []);

  const itemAdded = () => {
    toast.success("Item Added to Cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const itemNotAdded = () => {
    toast.error("Not enough Stock to add item!");
  };
  const pleaseLogin = () => {
    toast.error("please login or signup to make purchase")
  }

  // on click will set the menu items in cart but only their _ids,
  // only _ids will be sent to server then prices will be fetched from mongoDB
  const handleClick = (item) => {

    if(!user) {
      pleaseLogin();
      return
    }

    let foundProduct = cart.find((cartItem) => cartItem._id === item._id);
    if (foundProduct && foundProduct.quantity >= item.stock) {
      itemNotAdded();
    } else if (foundProduct) {
      itemAdded();
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                quantity: (cartItem.quantity += 1),
              }
            : cartItem
        )
      );
    } else {
      setCart([...cart, item]);
      itemAdded();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.menuContainer}
    >
      {menuItems ? (
        <div>
          <div className="container">
            <MenuItem
             image={brisket}
             addItem={handleClick}
             item={menuItems[0]}
             />
            <MenuItem
             image={pork}
             addItem={handleClick}
             item={menuItems[1]}
             />
            {/* <MenuItem
             image={chicken}
             addItem={handleClick}
             item={menuItems[2]}
             /> */}
          </div>
          {openModal ? <Modal closeModal={()=>setOpenModal(!openModal)} /> : null}
        </div>
      ) : (
        <Puff
          height={100}
          width={100}
          radius={5}
          color="white"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      )}
    </motion.div>
  );
};
export default Menu;
