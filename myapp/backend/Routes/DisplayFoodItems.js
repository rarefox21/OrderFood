// Routes/DisplayFoodItems.js
const express = require("express");
const router = express.Router();

router.get("/fooddata", async (req, res) => {
  try {
    if (!global.food_items || !global.food_Category) {
      return res.status(500).json({ error: "Food data not loaded" });
    }

    // Define your desired order
    const categoryOrder = ["Starter", "Pizza", "Biriyani/Rice"];

    // Sort categories by the order, move unmatched ones to end
    const sortedCategories = [...global.food_Category].sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.CategoryName);
      const indexB = categoryOrder.indexOf(b.CategoryName);

      return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
    });

    res.status(200).json({
      items: global.food_items,
      categories: sortedCategories,
    });
  } catch (error) {
    console.error("❌ Error in /fooddata route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
