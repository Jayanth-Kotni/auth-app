// utils/passwordUtils.js
const bcrypt = require('bcrypt');
const saltRounds = 10; // Recommended value

const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePasswords };
