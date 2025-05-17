require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoDB = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware to parse JSON requests
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));

app.listen(port, () => {
  console.log(`✅ Example app listening on port ${port}`);
});
