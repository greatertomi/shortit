const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const clusterName = process.env.MONGO_CLUSTER_NAME;

const uri = `mongodb+srv://${username}:${password}@${clusterName}.zak5mmj.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas Connected');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
  }
};

module.exports = connectDB;
