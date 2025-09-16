const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  // Remove password from output
  user.password = undefined;
  
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, rememberMe } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // 3) Update rememberMe if needed
    if (user.rememberMe !== rememberMe) {
      user.rememberMe = rememberMe;
      await user.save({ validateBeforeSave: false });
    }

    // 4) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, firstName, lastName, rememberMe } = req.body;

    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      rememberMe
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already exists'
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in. Please log in to get access.'
      });
    }

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.'
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid token'
    });
  }
};