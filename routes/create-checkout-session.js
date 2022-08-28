// This is your test secret API key.
const stripe = require('stripe')(
    'sk_test_51Lb9wkAAgyKcvNJTRqDAxhoN8BH7ke0cYDHUIJW2n4VDJo4py8iq94QscVh518PpJ67FnvLLD9imJlIPuCC7YUkd00HamZx0mC'
  );
const express = require('express');
const router = express.Router()

const YOUR_DOMAIN = 'http://localhost:4000';

router.post('/', async (req, res) => {

    const { payload } = req.body
    console.log(payload)
    let line_items = []
    for (const item of payload.items){
        line_items.push({
            price: item.price_id,
            quantity: 1
        })
    }
  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    customer_creation: 'always',
    metadata: {
        pickupDate: payload.pickupDate
    },
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success?id={CHECKOUT_SESSION_ID}` ,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: {enabled: false},
  });

  res.json({url: session.url});
});

module.exports = router