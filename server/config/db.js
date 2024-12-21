const mongoose = require('mongoose');
require('dotenv').config();



const connectDB = async () => {
  try {
    const dbURI =
      process.env.NODE_ENV === 'test'
        ? process.env.TEST_MONGO_URI
        : process.env.MONGO_URI;

    console.log('Connecting to MongoDB with URI:', dbURI);

    await mongoose.connect(dbURI);
    console.log(`MongoDB Connected to ${process.env.NODE_ENV} database`);
    console.log(`Connecting to MongoDB with URI: ${process.env.TEST_MONGO_URI}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1); 
    }
  }
};

const disconnectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      await mongoose.connection.dropDatabase();
      console.log('Test database dropped...');
    }
    await mongoose.connection.close();
    console.log('MongoDB Disconnected...');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error.message);
  }
};

module.exports = { connectDB, disconnectDB };

