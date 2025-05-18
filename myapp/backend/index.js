require('dotenv').config();
const express = require('express');
const mongoDB = require('./db'); // your MongoDB connection file
const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all origins (allow frontend to call backend)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connect to MongoDB
mongoDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayFoodItems'));
//app.use('/api', require('./Routes/FetchUser'));
// app.use('/api', require('./Routes/UpdateUser'));

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}`);
});
