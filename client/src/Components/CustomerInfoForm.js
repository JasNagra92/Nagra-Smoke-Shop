import styles from "../Styles/form.module.css"

const CustomerInfoForm = ({ customerInfo, handleInput, fillInfo }) => {
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
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={customerInfo.email}
          onChange={(e) => handleInput(e)}
          placeholder="Email"
        />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={customerInfo.phoneNumber}
          onChange={(e) => handleInput(e)}
          placeholder="Phone Number"
        />
        <button onClick={fillInfo}>Fill with account info</button>
      </div>
  );
};
export default CustomerInfoForm;