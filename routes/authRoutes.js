const express = require('express');
const { registerUser, loginUser, logoutUser, validateRegisterInput, validateLoginInput } = require('../controllers/authController');
const { forgotPassword, resetPassword } = require('../controllers/passwordController');

const router = express.Router();

router.post('/register', validateRegisterInput, registerUser);
router.post('/login', validateLoginInput, loginUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
