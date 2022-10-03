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
          <h3 style={{ textAlign: "left", color: 'black'}}>Smoked {item.name}</h3>
          <p>{item.description}</p>
        </div>
        <div className={styles.btnContainer}>
          <button onClick={()=>addItem(item)} className={styles.orderBtn}>Order Now</button>
          <p>Available Stock: {item.stock}</p>
          <p>Price: {item.price}</p>
        </div>
      </div>
    </div>
  );
};
export default MenuItem;
