const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validation = require('../middleware/validation');

// Regular login/signup
router.post('/login', validation.validateLogin, authController.login);
router.post('/signup', validation.validateSignup, authController.signup);

// Protect route example
router.get('/profile', authController.protect, (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
});

module.exports = router;