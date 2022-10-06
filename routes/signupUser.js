const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: "3d" });
};

router.post("/", async (req, res) => {
  const { email, password, passwordConfirm, name, phoneNumber } = req.body;

  try {
    const user = await User.signup(email, password, passwordConfirm, name, phoneNumber);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

module.exports = router;
