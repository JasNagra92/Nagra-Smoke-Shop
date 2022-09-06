const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

router.post('/', async (req, res) => {
  const db = mongoose.connection.db;
  const cart = req.body.cart;
  let data = [];
  try {
    for (const obj of cart) {
      let item = await db
        .collection('menuItems')
        .findOne({ _id: new ObjectID(obj._id)})
      item.quantity = obj.quantity
      data.push(item);
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

module.exports = router;
