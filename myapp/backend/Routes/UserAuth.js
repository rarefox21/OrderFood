const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

router.post(
  "/CreateUser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 3 }),
    body("password")
      .isLength({ min: 8 })
      .matches(/[A-Z]/)
      .matches(/[a-z]/)
      .matches(/\d/)
      .matches(/[^a-zA-Z0-9]/),
    body("address").notEmpty(),
    body("phoneNumber").isMobilePhone("any").isLength({ min: 11, max: 14 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, address, phoneNumber } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }

      await User.create({ name, email, password, address, phoneNumber });
      res.json({ success: true, message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);

router.post("/LoginUser", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
    res.json({ success: true, message: "Login successful", authToken: token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;