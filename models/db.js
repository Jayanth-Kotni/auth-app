const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',     // Change if your MySQL server is remote
    user: 'root',          // Change according to your MySQL credentials
    password: 'Jay@2003',          // Enter your MySQL password
    database: 'auth_db'    // Use an existing database or create a new one
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error(' MySQL connection failed:', err.message);
    } else {
        console.log(' Connected to MySQL database.');
    }
});

module.exports = db;
