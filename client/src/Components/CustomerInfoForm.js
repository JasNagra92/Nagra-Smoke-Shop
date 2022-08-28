import styles from '../Styles/form.module.css';
const CustomerInfoForm = ({ customerInfo, handleInput }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
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
        placeholder="email"
      />
    </form>
  );
};
export default CustomerInfoForm;
