const express = require('express');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Example of a protected route
router.get('/dashboard', verifyToken, (req, res) => {
    res.json({ success: true, message: `Welcome, ${req.user.email}! You have access.` });
});

module.exports = router;
