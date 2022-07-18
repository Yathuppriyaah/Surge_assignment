const jwt = require('jsonwebtoken');
const CustomApiErrorHandler = require('../utils/CustomApiErrorHandler');
const { StatusCodes } = require('http-status-codes');

exports.authenticatedUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomApiErrorHandler('Unauthorized', StatusCodes.UNAUTHORIZED);
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new CustomApiErrorHandler('Unauthorized', StatusCodes.UNAUTHORIZED);
  }
};
