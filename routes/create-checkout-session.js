// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51Lb9wkAAgyKcvNJTRqDAxhoN8BH7ke0cYDHUIJW2n4VDJo4py8iq94QscVh518PpJ67FnvLLD9imJlIPuCC7YUkd00HamZx0mC"
);
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const YOUR_DOMAIN = "http://localhost:4000";

router.post("/", async (req, res) => {
  const { payload } = req.body;
  let query = [];
  const db = mongoose.connection.db;
  // create a query containing price_id's of each item that was sent from the client
  for (const item of payload.items) {
    query.push(item.price_id);
  }
  
  db.collection("menuItems")
    .find({ price_id: { $in: query } })
    .toArray((err, docs) => {
      if (err) {
        console.log(err);
      }
      // compare each items quantity that was sent from the server with that items
      // stock value that is fetched from the database, if the quantity ordered
      // is higher than the availble stock, throws an error and does not proceed
      // with checkout
      for (const item of payload.items) {
        const docToCheck = docs.find((doc) => doc.price_id === item.price_id);
        if (item.quantity > docToCheck.stock) {
          res.json({ error: "not enough stock" });
        }
      }
    });

  let line_items = [];
  for (const item of payload.items) {
    line_items.push({
      price: item.price_id,
      quantity: item.quantity,
    });
  }
  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    customer_creation: "always",
    customer_email: payload.email,
    metadata: {
      pickupDate: payload.pickupDate,
    },
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: { enabled: false },
  });

  res.json({ url: session.url });
});

module.exports = router;
