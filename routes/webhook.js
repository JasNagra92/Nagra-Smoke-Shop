const express = require('express')
const router = express.Router()
const endpointSecret =
  'whsec_6b80fda20b62f1cdd04a7e4df2073cdddba1116601ffcebc47c65dd2e97cb03c';

router.post('/', express.raw({'type':'application/json' }), (req,res) => {
    let event = req.body;

    if (endpointSecret) {
      const signature = req.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log('Webhook signature verification failed', err.message);
        return res.sendStatus(400);
      }
    }
  
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log(event.data.object);
        break;
      default:
        console.log(`unhandled event type ${event.type}`);
    }
    res.send();
})
module.exports = router