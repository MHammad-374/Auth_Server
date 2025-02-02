const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

dotenv.config();

const generateTokenAndSetCookie = (res, userId) => {
    let payload = { userId };
    let options = { expiresIn: "15m" };
    const token = jwt.sign(payload, process.env.JWT_TOKEN, options);

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000  // 15 min
    })

    return token;
}

module.exports = generateTokenAndSetCookie