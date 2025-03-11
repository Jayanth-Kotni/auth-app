const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { findUserByEmail, updateUserResetToken, updateUserPassword } = require('../models/user');
const db = require('../models/db'); // MySQL database connection

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

// Handle Forgot Password Request
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        // Find user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Generate unique token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour validity

        // Save token to DB
        await updateUserResetToken(email, resetToken, resetTokenExpiry);

        // Send email with reset link
        const resetLink = `http://localhost:5000/auth/reset-password/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            text: `Click the link below to reset your password:\n\n${resetLink}\n\nThis link expires in 1 hour.`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset link sent. Check your email." });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
};

// Handle Password Reset Form Submission
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters long." });
        }

        // Find user by reset token
        const [rows] = await db.promise().query(
            'SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiry > ?',
            [token, Date.now()]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }

        const user = rows[0];

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear reset token
        await updateUserPassword(user.email, hashedPassword);

        res.json({ message: "Password reset successful. Please login." });
    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
};

module.exports = { forgotPassword, resetPassword };
