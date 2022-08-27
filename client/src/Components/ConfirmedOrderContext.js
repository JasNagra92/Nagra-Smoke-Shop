import React, {createContext, useState} from "react";

export const ConfirmedOrderContext = createContext()

export const ConfirmedOrderProvider = props => {
    const [confirmedOrder, setConfirmedOrder] = useState([])
    return(
        <ConfirmedOrderContext.Provider value={[confirmedOrder,setConfirmedOrder]}>
            {props.children}
        </ConfirmedOrderContext.Provider>
    )
}