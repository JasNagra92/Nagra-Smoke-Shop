// cart context will be used to send cart item number to the Nav bar
// to have a counter update with number of items in cart

import React, {createContext, useState} from "react";

export const CartContext = createContext()

export const CartProvider = props => {
    const [cart, setCart] = useState([])
    return(
        <CartContext.Provider value={[cart,setCart]}>
            {props.children}
        </CartContext.Provider>
    )
}