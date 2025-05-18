const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://OrderFood:OrderFood123@cluster0.s2jo4tv.mongodb.net/OrderFood?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    global.food_items = fetched_data;
    console.log("✅ Food items fetched successfully:\n");
    
  } catch (err) {
    console.error("❌ MongoDB error:", err);
  }
};

module.exports = mongoDB;