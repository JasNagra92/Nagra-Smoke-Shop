const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    const db = mongoose.connection.db
    const doc = await db.collection('orders').findOne({checkoutSessionId: req.query.id })
    res.json(doc)
})

module.exports = router