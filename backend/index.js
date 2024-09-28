const express = require('express');
const cors = require('cors');
const { connectDB, fetchFoodItems } = require('./db'); // Importing database functions
const createUserRouter = require('./Routes/CreateUser'); // Importing user routes
const displayDataRouter = require('./Routes/DisplayData'); // Importing data display routes

const app = express();
const port = 4000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB and start server
async function startServer() {
  try {
    await connectDB();
    console.log('MongoDB connected');

    // Fetch initial data from MongoDB
    await fetchFoodItems();

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit with failure
  }
}

startServer();

// Routes
app.use('/api', createUserRouter); // Use the createUserRouter
app.use('/api', displayDataRouter); // Use the displayDataRouter

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app; // This line allows the app to be tested if needed
