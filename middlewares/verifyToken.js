const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

dotenv.config();

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
           return res.status(401).json({ message: "Unauthorized - no token provided." })
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - invalid token" })
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error." })
    }
}

module.exports = verifyToken