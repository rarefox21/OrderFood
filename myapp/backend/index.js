require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

(async () => {
  await mongoDB();

  app.use("/api", require("./Routes/UserAuth"));
  app.use("/api", require("./Routes/DisplayFoodItems"));

  app.get("/", (req, res) => {
    res.send("Hello from Food Ordering Backend!");
  });

  app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
  });
})();