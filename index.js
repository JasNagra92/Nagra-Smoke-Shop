const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const menuRoutes = require('./routes/menu');
const cartRoutes = require('./routes/cart')

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, './client/build')))

app.use('/api', menuRoutes);
app.use('/api', cartRoutes)

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./client/build', 'index.html'))
})

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        app.listen(process.env.PORT, '0.0.0.0', () => {
            console.log(`db connected and server now listening on`);
          });
    })
    .catch((error) => {
        console.log(error);
      });
