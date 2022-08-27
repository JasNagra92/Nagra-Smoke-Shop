const stripe = require('stripe')(
  'sk_test_51Lb9wkAAgyKcvNJTRqDAxhoN8BH7ke0cYDHUIJW2n4VDJo4py8iq94QscVh518PpJ67FnvLLD9imJlIPuCC7YUkd00HamZx0mC'
);
const express = require('express');
const endpointSecret =
  'whsec_6b80fda20b62f1cdd04a7e4df2073cdddba1116601ffcebc47c65dd2e97cb03c';
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const menuRoutes = require('./routes/menu');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const { response } = require('express');

const YOUR_DOMAIN = process.env.REACT_APP_baseURL || 'http://localhost:4000';

app.use(cors());
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100.0,
    currency: 'cad',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
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
      console.log(`unhandled eventt type ${event.type}`);
  }
  res.send();
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`db connected and server now listening on`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
