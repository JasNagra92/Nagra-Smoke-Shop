const CustomerInfoForm = ({ customerInfo, handleInput }) => {
  return (
      <div style={{
        display: 'flex',
        gap: '10px'
      }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={(e) => handleInput(e)}
          placeholder="Name"
        />
      </div>
  );
};
export default CustomerInfoForm;