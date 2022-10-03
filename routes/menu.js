const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  const db = mongoose.connection.db;
  db.collection("menuItems")
    .find({})
    .project({ price_id: 0 })
    .sort({ name: "ascending" })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ err: err });
      }
      res.status(200).json({ result });
    });
});

module.exports = router;
