const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET ="MyNameIsAbrarMubeen";


// Route for creating a new user (signup)
router.post('/CreateUser', [
  body('email', 'Invalid Email').isEmail(),
  body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
  body('password')
    .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/).withMessage('Password must contain at least one special character')
    .withMessage('Password must contain at least one number and one special character'),
  body('address', 'Address is required').notEmpty(),
  body('phoneNumber', 'Phone number is required').notEmpty()
    .isMobilePhone('any')
    .withMessage('Invalid phone number format')
    .isLength({ min: 11, max: 14 })
    .withMessage('Phone number must be between 11 and 14 digits')
], 

  async (req, res) => {
  const errors = validationResult(req);
  
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, password, address, phoneNumber } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber
    });

    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Route for user login
router.post('/loginUser', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    
    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data,JWT_SECRET);
    res.json({ success: true, message: "Login successful", authToken:authToken });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
