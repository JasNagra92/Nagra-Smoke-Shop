const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  console.log(req)
  const {
    name,
    email,
    items,
    pickupDate,
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
    name: name,
    email: email,
    items: items,
    orderNumber: orderNumber,
    paid: false,
    pickupDate: pickupDate,
  });
  try {
    const doc = await order.save();
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
