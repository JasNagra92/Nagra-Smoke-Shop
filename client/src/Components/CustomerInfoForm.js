import styles from "../Styles/form.module.css"

const CustomerInfoForm = ({ customerInfo, handleInput }) => {
  return (
      <div className={styles.mainContainer}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={(e) => handleInput(e)}
          placeholder="Name"
        />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={customerInfo.phoneNumber}
          onChange={(e) => handleInput(e)}
          placeholder="Phone Number"
        />
      </div>
  );
};
export default CustomerInfoForm;