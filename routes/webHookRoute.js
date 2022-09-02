require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const MenuItem = require("../models/menuItemModel");
const stripe = require("stripe")(
  "sk_test_51Lb9wkAAgyKcvNJTRqDAxhoN8BH7ke0cYDHUIJW2n4VDJo4py8iq94QscVh518PpJ67FnvLLD9imJlIPuCC7YUkd00HamZx0mC"
);
const endpointSecret =
  "whsec_6b80fda20b62f1cdd04a7e4df2073cdddba1116601ffcebc47c65dd2e97cb03c";

router.post("/", express.raw({ type: "application/json" }), (req, res) => {
  const payload = req.body;
  console.log("got payload:" + payload);

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const { id } = event.data.object;
    const { name, email } = event.data.object.customer_details;
    const pickupDate = event.data.object.metadata;
    const db = mongoose.connection.db;

    // this function will check the database for an existing order
    // that matches the number passed as an argument and return that
    // document if found, or null if not found
    const checkOrderNumber = async (number) => {
      let result = await db
        .collection("orders")
        .findOne({ orderNumber: number });
      return result;
    };

    const randomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min));
    };

    let orderNumber;
    let repeat;
    // loop through random numbers until one is found
    // that does not already exist in the database
    do {
      orderNumber = randomInt(100000, 999999);
      repeat = checkOrderNumber(orderNumber) ? false : true;
    } while (repeat);

    // retrieve the line items from the checkout session that is sent
    // from stripe and use those to create new a order containing
    // customer information along with what they ordered
    stripe.checkout.sessions.listLineItems(
      id,
      { limit: 5 },
      async (err, lineItems) => {
        if (err) {
          console.log(err);
        }
        let order = new Order({
          name: name,
          email: email,
          checkoutSessionId: id,
          paid: true,
          pickupDate: pickupDate.pickupDate,
          orderNumber: orderNumber,
          items: lineItems.data,
        });
        try {
          order.save();
          for (const item of lineItems.data) {
            const doc = await MenuItem.findOne({ name: item.description });
            console.log(doc);
            let newStock = doc.stock - item.quantity;
            doc.stock = newStock;
            await doc.save();
          }
          res.sendStatus(200).end();
        } catch (err) {
          console.log(err);
          res.sendStatus(400);
        }
      }
    );
  } else {
    console.log(`Unhandled event type ${event.type}.`);
    res.send();
  }
});

module.exports = router;
