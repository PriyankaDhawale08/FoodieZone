const mongoose = require('mongoose');

const mongoURI = 'mongodb://foodiezone:priyanka@ac-svxf7ya-shard-00-00.ugavg21.mongodb.net:27017,ac-svxf7ya-shard-00-01.ugavg21.mongodb.net:27017,ac-svxf7ya-shard-00-02.ugavg21.mongodb.net:27017/foodiezonemern?ssl=true&replicaSet=atlas-jrvlfh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

const fetchFoodItems = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB not connected');
    }

    const db = mongoose.connection.db;
    const foodItemsCollection = db.collection('food_items');
    const foodCategoryCollection = db.collection('foodCategory');

    const foodItems = await foodItemsCollection.find({}).toArray();
    const foodCategory = await foodCategoryCollection.find({}).toArray();

    global.food_items = foodItems;
    global.foodCategory = foodCategory;

    console.log('Fetched food items:', global.food_items);
    console.log('Fetched food categories:', global.foodCategory);
  } catch (err) {
    console.error('Error fetching food items:', err.message);
    throw err;
  }
};

module.exports = { connectDB, fetchFoodItems };
