import { useState } from "react";
import styles from "../Styles/Modal.module.css";
import hot from "../Images/hotrub.jpg";
import bbq from "../Images/bbqrub.jpg";

const Modal = ({ closeModal }) => {
  const [selectedRub, setSelectedRub] = useState(null);

  const selectedStyle = {
    border: "2px solid blue",
  };

  const handleClick = () => {};

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.closeBtn}>
          <p onClick={() => closeModal()}>X</p>
        </div>
        <div className={styles.imgContainer}>
          <div style={selectedRub === 'hot' ? selectedStyle : null} onClick={()=> setSelectedRub('hot')} className={styles.imgDiv}>
            <img className={styles.modalImg} src={hot} alt="hot rub" />
          </div>
          <div style={selectedRub === 'bbq' ? selectedStyle : null} onClick={()=> setSelectedRub('bbq')} className={styles.imgDiv}>
            <img className={styles.modalImg} src={bbq} alt="hot rub" />
          </div>
          <div className={styles.imgDiv}>
            <img className={styles.modalImg} src={hot} alt="hot rub" />
          </div>
          <div className={styles.imgDiv}>
            <img className={styles.modalImg} src={hot} alt="hot rub" />
          </div>
          <div className={styles.imgDiv}>
            <img className={styles.modalImg} src={hot} alt="hot rub" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
