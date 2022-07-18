const User = require('../models/user');
const CustomApiErrorHandler = require('../utils/CustomApiErrorHandler');
const { StatusCodes } = require('http-status-codes');
const mg = require('mailgun-js');

const mailgun = () =>
  mg({
    apiKey: process.env.API_KEY,
    domain: process.env.DOMAIN,
  });

// create a new User >> admin route
exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  //   check if user exists already
  const userExists = await User.findOne({ email });
  if (userExists)
    throw new CustomApiErrorHandler(
      'User already Exists',
      StatusCodes.BAD_REQUEST
    );

  // to create a new user in the database
  const user = await User.create({ email, password });

  //   to create a JWT token
  const token = user.createJWT();

  // send email to user
  const subject = 'User Creation';

  const resetUrl = `${process.env.FRONTEND_URL}`;

  // email message
  const message = `Your account has been created. Click this link to access your account and fill required details. Link is :\n\n${resetUrl}\n\n the default password is ${password}`;

  const data = {
    from: 'Admin <admin@gmail.com>',
    to: `${email}`,
    subject: `${subject}`,
    html: `<p>${message}</p>`,
  };
  mailgun()
    .messages()
    .send(data, (error, body) => {
      if (error) {
        throw new CustomApiErrorHandler('Error in sending email', 400);
      }
    });

  res.status(StatusCodes.CREATED).json({
    success: true,
    token,
    user,
    message: 'Email sending to user successfully',
  });
};

// login route
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // if empty fields throw an error
  if (!email || !password)
    throw new CustomApiErrorHandler(
      'Please provide all the values',
      StatusCodes.BAD_REQUEST
    );

  //  find a user first
  const user = await User.findOne({ email });
  if (!user)
    throw new CustomApiErrorHandler(
      `Invalid Credentials`,
      StatusCodes.BAD_REQUEST
    );

  //  match the password
  const isMatch = user.password === password;
  if (!isMatch)
    throw new CustomApiErrorHandler(
      `Invalid Credentials`,
      StatusCodes.BAD_REQUEST
    );

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    success: true,
    token,
    user,
  });
};

// view profile route
exports.me = async (req, res) => {
  const { id } = req.params;

  //  find a user first
  const user = await User.findById({ _id: id });
  if (!user)
    throw new CustomApiErrorHandler(`No User Found`, StatusCodes.BAD_REQUEST);

  res.status(StatusCodes.CREATED).json({
    success: true,

    user,
  });
};

// update profile route

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  //  find a user first
  const note = await User.findOne({ _id: id });
  if (!note)
    throw new CustomApiErrorHandler(
      `Invalid Credentials`,
      StatusCodes.BAD_REQUEST
    );

  const userUpdated = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ userUpdated });
};

// to get all the users route
exports.getAllUsers = async (req, res) => {
  const users = await User.find({ accountType: 'student' });
  res.status(StatusCodes.OK).json({ success: true, users });
};
