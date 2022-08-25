import styles from '../Styles/form.module.css';
const CustomerInfoForm = ({ customerInfo, handleInput }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>First Name:</label>
      <input
        type="text"
        name="fname"
        value={customerInfo.fname}
        onChange={(e) => handleInput(e)}
        placeholder="first Name"
      />
      <label>Last Name:</label>
      <input
        type="text"
        name="lname"
        value={customerInfo.lname}
        onChange={(e) => handleInput(e)}
        placeholder="last Name"
      />
      <label>Stree Address:</label>
      <input
        type="text"
        name="street_address"
        value={customerInfo.street_address}
        onChange={(e) => handleInput(e)}
        placeholder="street address"
      />
      <label>City:</label>
      <input
        type="text"
        name="city"
        value={customerInfo.city}
        onChange={(e) => handleInput(e)}
        placeholder="city"
      />
      <label>Postal Code:</label>
      <input
        type="text"
        name="postal_code"
        value={customerInfo.postal_code}
        onChange={(e) => handleInput(e)}
        placeholder="postal code"
      />
    </form>
  );
};
export default CustomerInfoForm;
