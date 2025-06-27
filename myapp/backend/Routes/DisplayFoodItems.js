const express = require("express");
const router = express.Router();

router.get("/fooddata", async (req, res) => {
  try {
    if (!global.food_items || !global.food_Category) {
      return res.status(500).json({ error: "Food data not loaded" });
    }
    res.status(200).json({
      items: global.food_items,
      categories: global.food_Category,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;