const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect(process.env.MONGO_URI);
  console.log(`Database connected`);
};

module.exports = connectDatabase;
