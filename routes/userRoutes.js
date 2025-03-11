const express = require('express');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
    res.json({ success: true, message: `Hello, ${req.user.email}! This is your profile.` });
});

module.exports = router;
