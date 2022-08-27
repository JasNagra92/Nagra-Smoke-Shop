// import { useLocation } from 'react-router-dom'
import styles from '../Styles/OrderConfirmation.module.css'
const OrderConfirmation = () => {
    // const data = useLocation()
    // const { order } = data.state

    return (
        <div className={styles.mainContainer}>
            <div className="container">
                <h1>Your Order Number: </h1>
            </div>
        </div>
    )
}
export default OrderConfirmation