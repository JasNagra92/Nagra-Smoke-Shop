import { useContext } from 'react'
import { ConfirmedOrderContext } from './ConfirmedOrderContext'
import styles from '../Styles/OrderConfirmation.module.css'
const OrderConfirmation = () => {
    const [confirmedOrder] = useContext(ConfirmedOrderContext)

    return (
        <div className={styles.mainContainer}>
            <h1>test</h1>
        </div>
    )
}
export default OrderConfirmation