require('dotenv').config();
const connectDatabase = require('./config/db');
const User = require('./models/user');

connectDatabase();

// to create a admin
const seedAdmin = async () => {
  try {
    // to delete the admin if it in the database first
    await User.deleteOne({ accountType: 'admin' });

    // to create a new admin
    await User.create({
      email: 'admin@gmail.com',
      password: 'password',
      accountType: 'admin',
    });
    console.log('Admin Inserted');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();
