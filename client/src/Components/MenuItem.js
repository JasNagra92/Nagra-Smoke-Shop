import styles from "../Styles/MenuItem.module.css";
import Select from "react-select";

const MenuItem = ({ item, image, smImage, onChangeInput, addItem }) => {
  const options = [
    { value: "hot", label: "Hot BBQ rub" },
    { value: "bbq", label: "The BBQ rub" },
    { value: "hogsTx", label: "Killer Hogs TX Brisket rub" },
    { value: "honey", label: "Meat Church Honey Hog BBQ rub" },
    { value: "holyCow", label: "Meat Church Holy Cow BBQ rub" },
    { value: "gospel", label: "Meat Church The Gospel AP rub" },
  ];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topHalf}>
        <div className={styles.imgContainer}>
          <img
            className={styles.image}
            src={image}
            alt=""
            srcSet={`${image} 1200w, ${smImage} 100w`}
            sizes="(max-width: 500px)100px, 1200px"
          />
        </div>
        <div className={styles.description}>
          <h3 className={styles.heading}>Smoked {item.name}</h3>
          <p>{item.description}</p>
        </div>
        <div className={styles.btnContainer}>
          <button onClick={() => addItem(item)} className={styles.orderBtn}>
            Order Now
          </button>
          <p>Available Stock: {item.stock}</p>
          <p>Price: {item.priceStr}</p>
          <p>
            <Select
              menuPortalTarget={document.body}
              onChange={(e) => onChangeInput(e.value, item)}
              options={options}
            />
          </p>
        </div>
      </div>
    </div>
  );
};
export default MenuItem;
