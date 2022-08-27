import { useContext } from 'react'
import { ConfirmedOrderContext } from './ConfirmedOrderContext'
import styles from '../Styles/OrderConfirmation.module.css'
const OrderConfirmation = () => {
    const [confirmedOrder] = useContext(ConfirmedOrderContext)

    return (
        <div className={styles.mainContainer}>
            <div className="container">
                {confirmedOrder.map(item=>{
                    return <p>{item}</p>
                })}
            </div>
        </div>
    )
}
export default OrderConfirmation