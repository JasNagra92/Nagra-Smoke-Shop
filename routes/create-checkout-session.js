// This is your test secret API key.
const stripe = require('stripe')(
    'sk_test_51Lb9wkAAgyKcvNJTRqDAxhoN8BH7ke0cYDHUIJW2n4VDJo4py8iq94QscVh518PpJ67FnvLLD9imJlIPuCC7YUkd00HamZx0mC'
  );
const endpointSecret = 'whsec_6b80fda20b62f1cdd04a7e4df2073cdddba1116601ffcebc47c65dd2e97cb03c'
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
    customer_email: payload.email,
    customer_creation: 'always',
    metadata: {
        name: payload.name,
        pickupDate: payload.pickupDate
    },
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: {enabled: false},
  });

  res.json({url: session.url});
});

module.exports = router