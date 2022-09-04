import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import pork from "../Images/Pork-Butt2.jpg";
import brisket from "../Images/Brisket2.jpg";
import frozen from "../Images/brisketsealed.jpg";
import fresh from "../Images/freshsmoked.jpg";

const Home = () => {
  const [intro, setIntro] = useState(true);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIntro(!intro);
    setStepOne(true);
  };
  const handleClickTwo = () => {
    setStepOne(!stepOne);
    setStepTwo(true);
  };
  const handleClickThree = () => {
    navigate("/menu");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      class="container"
    >
      <div className={styles.homeContainer}>
        <AnimatePresence mode="wait">
          {intro && (
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
                  <button id={styles.howItWorks} onClick={handleClick}>
                    How It Works
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {stepOne && (
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
          {stepOne && (
            <motion.div
              key={"stepOneDescription"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.stepOneDescription}
            >
              <div className={styles.stepOneText}>
                <p>
                  Choose between either 10lbs of 12 hour applewood smoked Pork
                  Shoulder or 12 hour smoked Beef Brisket
                </p>
                <button className={styles.stepOneBtn} onClick={handleClickTwo}>
                  Step Two
                </button>
              </div>
            </motion.div>
          )}
          {stepTwo && (
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
                <div className={styles.or}>
                  <p>Or</p>
                </div>
                <div className={styles.aboveImg}>
                  <h5>Fresh off the Smoker</h5>
                  <div className={styles.imgContainer}>
                    <img src={fresh} alt="pork butt being wrapped" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {stepTwo && (
            <motion.div
              key={"stepTwoDescription"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.stepOneDescription}
            >
              <div className={styles.stepTwoText}>
                <p>Select a Pick Up time and choose between Frozen or Hot.</p>
                <p>
                  Frozen - The meat will be smoked for 12 hours, taken off the
                  smoker and rested for 2 hours minimum before being portioned
                  into bags and frozen.
                </p>
                <p>
                  Hot - When the meat is smoked, it is wrapped in foil after
                  approximately 5 hours. This prevents too much smoke absorption
                  and contains all the juicy drippings from the meat. The meat
                  will finish smoking at the seleced pick-up time and you can
                  come pick it up still wrapped fresh off the smoker. It is
                  recommended to bring a cooler to transport the brisket/pork
                  shoulder. Rest the meat for up to 4 hours and then enjoy.
                </p>
                <button
                  className={styles.stepOneBtn}
                  onClick={handleClickThree}
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
