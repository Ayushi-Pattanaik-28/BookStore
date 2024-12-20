const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    const token = authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token expired, Please SignIn again" });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
