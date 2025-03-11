const db = require('./db'); // Import MySQL connection

// Ensure users table exists
const createUsersTable = async () => {
    try {
        await db.promise().query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                resetToken VARCHAR(255),
                resetTokenExpiry BIGINT
            )
        `);
        console.log(" Users table ensured.");
    } catch (error) {
        console.error(" Error creating users table:", error);
    }
};

createUsersTable();

// Find user by email
const findUserByEmail = async (email) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error(" Error finding user:", error);
        throw error;
    }
};

// Update reset token and expiry
const updateUserResetToken = async (email, token, expiry) => {
    try {
        const [result] = await db.promise().query(
            'UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?', 
            [token, expiry, email]
        );
        return result.affectedRows;
    } catch (error) {
        console.error(" Error updating reset token:", error);
        throw error;
    }
};

// Update user password and clear reset token
const updateUserPassword = async (email, hashedPassword) => {
    try {
        const [result] = await db.promise().query(
            'UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE email = ?', 
            [hashedPassword, email]
        );
        return result.affectedRows;
    } catch (error) {
        console.error(" Error updating password:", error);
        throw error;
    }
};

module.exports = { findUserByEmail, updateUserResetToken, updateUserPassword };
