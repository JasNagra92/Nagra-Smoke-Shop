// This is your test secret API key.
const stripe = require('stripe')(
    'sk_test_51Lb9wkAAgyKcvNJTRqDAxhoN8BH7ke0cYDHUIJW2n4VDJo4py8iq94QscVh518PpJ67FnvLLD9imJlIPuCC7YUkd00HamZx0mC'
  );
const express = require('express');
const router = express.Router()

const YOUR_DOMAIN = 'http://localhost:4000';

router.post('/', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1LbDgQAAgyKcvNJTkN9h2Y3X',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: {enabled: false},
  });

  res.json({url: session.url});
});

module.exports = router