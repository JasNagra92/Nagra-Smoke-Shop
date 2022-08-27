const express = require("express");
const router = express.Router();
const stripe = require('stripe')(
  'sk_test_51Lb9wkAAgyKcvNJTRqDAxhoN8BH7ke0cYDHUIJW2n4VDJo4py8iq94QscVh518PpJ67FnvLLD9imJlIPuCC7YUkd00HamZx0mC'
);

router.post('/', async (req, res) => {

  console.log(req.body);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100.0,
    currency: "cad",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
