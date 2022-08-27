const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  console.log(req)
  const {
    fname,
    lname,
    street_address,
    city,
    postal_code,
    items,
    deliveryDate,
  } = req.body.payload;

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min));
  };

  db = mongoose.connection.db;

  const checkOrderNumber = async (number) => {
    let result = await db.collection('orders').findOne({ orderNumber: number });
    return result;
  };
  let orderNumber;
  let repeat;
  do {
    orderNumber = randomInt(100000, 999999);
    repeat = checkOrderNumber(orderNumber) ? false : true;
  } while (repeat);

  let order = new Order({
    fname: fname,
    lname: lname,
    items: items,
    orderNumber: orderNumber,
    address: {
      street_address: street_address,
      city: city,
      postal_code: postal_code,
    },
    paid: false,
    deliveryDate: deliveryDate,
  });
  try {
    const doc = await order.save();
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
