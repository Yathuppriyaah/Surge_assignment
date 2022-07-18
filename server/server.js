require('dotenv').config();
require('express-async-errors');
const express = require('express');

const connectDatabase = require('./config/db');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// middlewares
app.use(express.json());

// database
connectDatabase();

// routes
app.use('/auth', require('./routes/userRoutes'));
app.use('/notes', require('./routes/noteRoutes'));
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
