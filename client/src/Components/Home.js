import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/menu");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
    >
      <div className={styles.homeContainer}>
        <AnimatePresence mode="wait">
          {
            <motion.div
              key={"introTitle"}
              className={styles.contentIntro}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div>
                <div className={styles.title}>
                  <h1>
                    <span id={styles.nagra}>Nagra</span> Smoke House
                  </h1>
                </div>
                <div className={styles.btn}>
                  <button id={styles.howItWorks} onClick={() => handleClick()}>
                    Our Menu
                  </button>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default Home;
