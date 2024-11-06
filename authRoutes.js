const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/authController');

// Sign up route (for both admins and users)
router.post('/signup', signUp);

// Sign in route (for both admins and users)
router.post('/signin', signIn);

module.exports = router;
