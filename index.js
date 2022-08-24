const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const menuRoutes = require('./routes/menu');

app.use(cors());

app.use(express.static(path.resolve(__dirname, './client/build')))

app.use('/api', menuRoutes);

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./client/build', 'index.html'))
})

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, '0.0.0.0', () => {
            console.log(`db connected and server now listening on ${PORT}`);
          });
    })
    .catch((error) => {
        console.log(error);
      });
