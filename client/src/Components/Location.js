import Map from "../Components/Map";
import styles from "../Styles/Location.module.css"

const Location = () => {
  return (
    <div className="container">
      <div className={styles.mapContainer}>
        <Map />
        <div>
            <p><span style={{fontStyle:'italic'}}>Address:</span> 14786 69 Avenue, Surrey, BC V3S2C6</p>
            <p><span style={{fontStyle:'italic'}}>Pickup Hours:</span> 7 days a week, 6pm - 10pm</p>
        </div>
      </div>
    </div>
  );
};
export default Location;
