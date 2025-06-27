require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    const db = mongoose.connection.db;

    // Check if collections exist and have data
    const foodItems = await db.collection("food_items").find({}).toArray();
    const foodCategories = await db.collection("food_Category").find({}).toArray();

    if (!foodItems.length || !foodCategories.length) {
      console.log("⚠️ One or both collections are empty or missing. Seeding data now...");

      // Read JSON files
      const categories = JSON.parse(fs.readFileSync("../foodCategory.json", "utf-8"));
      const foodData = JSON.parse(fs.readFileSync("../foodData2.json", "utf-8"));

      // Clear existing data just in case and insert
      await db.collection("food_Category").deleteMany({});
      await db.collection("food_Category").insertMany(categories);
      console.log(`✅ Seeded ${categories.length} categories into food_Category`);

      await db.collection("food_items").deleteMany({});
      await db.collection("food_items").insertMany(foodData);
      console.log(`✅ Seeded ${foodData.length} food items into food_items`);

      // Reload data after seeding
      global.food_Category = Object.freeze(categories);
      global.food_items = Object.freeze(foodData);
    } else {
      // Collections already have data, use them
      global.food_Category = Object.freeze(foodCategories);
      global.food_items = Object.freeze(foodItems);
    }

    console.log(`✅ Loaded ${global.food_items.length} food items and ${global.food_Category.length} categories`);
  } catch (err) {
    console.error("❌ MongoDB connection or data fetch error:", err);
    process.exit(1);
  }
};

module.exports = mongoDB;
