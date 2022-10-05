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
    <div className="container">
      <div className={styles.homeContainer}>
        {
          <div key={"introTitle"} className={styles.contentIntro}>
            <div>
              <div className={styles.title}>
                <h1>
                  <span id={styles.nagra}>Nagra</span> Smoke House
                </h1>
              </div>
              <div className={styles.btnContainer}>
                <button className={styles.btn} onClick={() => handleClick()}>
                  Our Menu
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};
export default Home;
