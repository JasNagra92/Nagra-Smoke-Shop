import styles from '../Styles/OrderDisplay.module.css'

const OrderDisplay = (props) => {
   const {OrderDate, pickupDate, orderNumber, amount_total} = props.orderProps
    return (
        <div className={styles.OrderContainer}>
            <p>{orderNumber}</p>
            <p>{OrderDate}</p>
            <p>{pickupDate}</p>
            <p>{(amount_total / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "CAD",
                })}</p>
        </div>
    )
}
export default OrderDisplay