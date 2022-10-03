import { useEffect } from "react";
import styles from "../Styles/MenuItem.module.css";

const MenuItem = (props) => {
  const addItem = props.addItem;
  const { item, image } = props;
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topHalf}>
        <div className={styles.imgContainer}>
          <img src={image} alt="" />
        </div>
        <div className={styles.description}>
          <h2 style={{ textAlign: "left" }}>Smoked {item.name}</h2>
          <p>{item.description}</p>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.orderBtn}>Order Now</button>
        </div>
      </div>
    </div>
  );
};
export default MenuItem;
