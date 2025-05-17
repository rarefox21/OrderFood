const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/CreateUser', async (req, res) => {
  try {
    // Create a new user
    await User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      address : req.body.address,
      phoneNumber : req.body.phoneNumber,
    });

    res.json('User created successfully');
  } catch (error) {
    console.log(error);
    res.json('Error creating user');
  }
}
);

// Export the router
module.exports = router; 