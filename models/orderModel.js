const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  items: { type: Array, required: true },
  address: {
    street_address: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: String, required: true },
  },
  paid: { type: Boolean, required: true },
  deliveryDate: { type: Date },
});

module.exports = mongoose.model('order', OrderSchema);
