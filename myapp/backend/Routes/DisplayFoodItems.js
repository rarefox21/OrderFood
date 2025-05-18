const express = require('express');
const router = express.Router();

router.post('/DisplayFoodItems', async (req, res) => {
  try {
 // Optionally log global data for debugging
    console.log("Global food items:", global.food_items);
    res.send(global.food_items);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.send({ error: "Internal server error" });
  }
});

module.exports = router;
