const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

const verifyToken = (req, res, next) => {
    try {
        // Get token from cookie or Authorization header (Bearer Token)
        let token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }

        // Verify token
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Forbidden: Invalid or expired token" });
            }

            req.user = decoded; // Attach decoded user data to request
            next();
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = verifyToken;
