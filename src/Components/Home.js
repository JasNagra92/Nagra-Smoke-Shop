import React from "react";
import styles from '../Styles/Home.module.css'

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.quoteContainer}>
                <p className={styles.quote}>Some of the best Smoked Brisket ive ever had</p>
                <h4> - Evan Penner </h4>
            </div>
            <div className={styles.hoursContainer}>
                <h5>Hours</h5>
                <p>Monday - Friday</p>
                <p>0900 - 0500</p>
                <p>Saturday - Sunday</p>
                <p>Closed</p>
 

            </div>
        </div>
    )
}
export default Home