const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
require("dotenv").config();

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No Token Provided!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Not authorized. Token is not valid' });
    }
};

module.exports = auth;