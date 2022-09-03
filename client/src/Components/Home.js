import React, { useState } from "react";
import styles from "../Styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div class="container">
        <div className={styles.homeContainer}>
          <AnimatePresence>
            <div className={styles.content}>
                {isVisible && (
                  <motion.div
                    key={'test'}
                    className={styles.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h1><span id={styles.nagra}>Nagra</span> Smoke House</h1>
                  </motion.div>
                )}
                <motion.div
                    key={'button'}
                    className={styles.btn}>
                        <button id={styles.howItWorks} onClick={handleClick}>How It Works</button>
                </motion.div>
            </div>
          </AnimatePresence>
        </div>
    </div>
  );
};
export default Home;
