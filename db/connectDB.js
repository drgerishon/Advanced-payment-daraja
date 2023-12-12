const mongoose = require('mongoose');
require("dotenv").config()

const dbUrl = process.env.MONGODB_URI || '';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(dbUrl);
    console.log(`MongoDB is connected to ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  }
};

module.exports = connectDB;
