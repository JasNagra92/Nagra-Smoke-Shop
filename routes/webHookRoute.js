require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const MenuItem = require("../models/menuItemModel");
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const endpointSecret = process.env.ENDPOINT_SECRET;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", express.raw({ type: "application/json" }), (req, res) => {
  const payload = req.body;

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    console.log(event.data.object);
    const { id, amount_total } = event.data.object;
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
          amount_total: amount_total,
          OrderDate: Date.now(),
        });
        const msg = {
          to: email,
          from: "nagra-smoke-house@outlook.com",
          subject: "Order Confirmation - Nagra-Smoke-House",
          text: "this is a test",
          html: `<ul>
          <li> ${name} </li>
          <li> ${pickupDate.pickupDate} </li>
          <li> your order number: ${orderNumber} </li>
          </ul>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email Sent");
          })
          .catch((error) => {
            console.log(error);
          });
        try {
          order.save();
          // after creating order, update the menu item document
          // that corresponds to the items that were ordered
          // and then reduce the stock by the quantity ordered
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
