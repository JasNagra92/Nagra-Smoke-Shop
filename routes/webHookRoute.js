const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
    'sk_test_51Lb9wkAAgyKcvNJTRqDAxhoN8BH7ke0cYDHUIJW2n4VDJo4py8iq94QscVh518PpJ67FnvLLD9imJlIPuCC7YUkd00HamZx0mC'
  );
  const endpointSecret = 'whsec_6b80fda20b62f1cdd04a7e4df2073cdddba1116601ffcebc47c65dd2e97cb03c'


router.post('/', express.raw({type: 'application/json'}), async(req,res) => {
    const payload = req.body
    console.log('got payload:' + payload)

    res.status(200)
})

module.exports = router