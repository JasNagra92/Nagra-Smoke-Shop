import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import pork from "../Images/Pork-Butt2.jpg";
import brisket from "../Images/Brisket2.jpg";
import frozen from "../Images/brisketsealed.jpg";

const Home = () => {
  const [step, setStep] = useState("intro");
  const navigate = useNavigate();

  const handleClick = (step) => {
    if (step === "menu") {
      navigate("/menu");
    } else {
      setStep(step);
    }
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
          {step === "intro" && (
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
                  <button
                    id={styles.howItWorks}
                    onClick={() => handleClick("one")}
                  >
                    How It Works
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {step === "one" && (
            <motion.div
              key={"stepOne"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.stepContainer}
            >
              <h3>Step One</h3>
              <div className={styles.pictures}>
                <div className={styles.aboveImg}>
                  <h4>Pulled Pork</h4>
                  <div className={styles.imgContainer}>
                    <img src={pork} alt="pulled pork" />
                  </div>
                </div>
                <div className={styles.or}>
                  <p>Or</p>
                </div>
                <div className={styles.aboveImg}>
                  <h4>Smoked Brisket</h4>
                  <div className={styles.imgContainer}>
                    <img src={brisket} alt="smoked brisket" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {step === "one" && (
            <motion.div
              key={"stepOneDescription"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.stepOneDescription}
            >
              <div className={styles.stepOneTextContainer}>
                <p className={styles.stepText}>
                  Choose between either 10lbs of 12 hour applewood smoked Pork
                  Shoulder or 12 hour smoked Beef Brisket
                </p>
                <button
                  className={styles.stepOneBtn}
                  onClick={() => handleClick("two")}
                >
                  Step Two
                </button>
              </div>
            </motion.div>
          )}
          {step === "two" && (
            <motion.div
              key={"stepTwoDescription"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.stepContainer}
            >
              <h3>Step Two</h3>
              <div className={styles.pictures}>
                <div className={styles.aboveImg}>
                  <h5>Smoked - Frozen - Packaged</h5>
                  <div className={styles.imgContainer}>
                    <img src={frozen} alt="vacuum sealed brisket" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {step === "two" && (
            <motion.div
              key={"stepTwoDescription"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.stepOneDescription}
            >
              <div className={styles.stepTwoTextContainer}>
                <p>Select a Pick Up Time</p>
                <p className={styles.stepText}>
                  The meat will be smoked for 12 - 16 hours, taken off the
                  smoker and rested for 2 hours before being portioned into bags
                  and placed in the freezer for pick up.
                </p>
                <button
                  className={styles.stepOneBtn}
                  onClick={() => handleClick("menu")}
                >
                  Place order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default Home;
