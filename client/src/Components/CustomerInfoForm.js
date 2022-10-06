import { useState, useEffect } from "react";
import styles from "../Styles/form.module.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import { addDays, setHours, setMinutes } from "date-fns";

const CustomerInfoForm = ({ customerInfo, handleInput, handleSubmit, fillInfo, setStartDate, startDate, disableBtn }) => {
  const [disabledDates, setDisabledDates] = useState();

  // function returns an array of Date objects made from list of
  // dates recieved from the server through a Get request that
  // queries the database of existing orders and sends back
  // existing pick up dates
  const formattedDates = (array) => {
    let excludedDates = [];
    for (const date of array) {
      excludedDates.push(new Date(date));
    }
    return excludedDates;
  };

    // on component mount get requeset recieves existing orders
  // pick up dates and stores them in disabled dates state array
  // to be given to react date picker to disable those dates
  // to prevent 2 orders being picked up on the same day, smoker
  // is too small to time multiple pick ups on same day
  useEffect(() => {
    const getDates = async () => {
      const response = await axios.get("/getExcludedDates");

      setDisabledDates(formattedDates(response.data));
    };
    getDates();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <input
        type="text"
        name="name"
        value={customerInfo.name}
        onChange={(e) => handleInput(e)}
        placeholder="Name"
      />
      <input
        type="text"
        name="email"
        value={customerInfo.email}
        onChange={(e) => handleInput(e)}
        placeholder="Email"
      />
      <input
        type="text"
        name="phoneNumber"
        value={customerInfo.phoneNumber}
        onChange={(e) => handleInput(e)}
        placeholder="Phone Number"
      />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={addDays(new Date(), 4)}
        excludeDates={disabledDates}
        showTimeSelect
        minTime={setHours(setMinutes(new Date(), 0), 18)}
        maxTime={setHours(setMinutes(new Date(), 0), 22)}
        timeFormat="HH:mm"
        dateFormat="MMMM,d,yyyy h:mm aa"
        placeholderText="Pick a day for pickup"
      />
      <button className={styles.fillBtn} onClick={fillInfo}>
        Fill form with account info
      </button>
      <button onClick={handleSubmit} disabled={disableBtn} className={styles.submitBtn}>Checkout</button>
    </div>
  );
};
export default CustomerInfoForm;
