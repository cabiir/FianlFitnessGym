const { body } = require('express-validator');

exports.validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .trim()
];

exports.validateSignup = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .trim(),
  
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('First name is required')
    .trim(),
  
  body('lastName')
    .not()
    .isEmpty()
    .withMessage('Last name is required')
    .trim()
];