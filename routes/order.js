const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

router.post('/', async (req, res) => {
  const { fname, lname, street_address, city, postal_code, items } =
    req.body.payload;
  let order = new Order({
    fname: fname,
    lname: lname,
    items: items,
    address: {
      street_address: street_address,
      city: city,
      postal_code: postal_code,
    },
    paid: false,
  });
  try {
    const doc = await order.save();
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
