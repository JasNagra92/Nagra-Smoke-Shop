const express = require('express');
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose')

router.get('/menu', (req, res) => {
    const db = mongoose.connection.db;
    db.collection('menuItems').find({}).project({_id:1}).toArray((err, result) => {
        if (err) {
            res.status(400).json({err:err})
        }
        res.status(200).json({ result });
    });
});

module.exports = router;
