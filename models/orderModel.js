const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  name: { type: String, required: true },
  email: {type: String, required: true},
  items: { type: Array, required: true },
  orderNumber: {type: Number, required: true},
  paid: { type: Boolean, required: true },
  pickupDate: { type: String, required: true },
});

module.exports = mongoose.model('order', OrderSchema);
