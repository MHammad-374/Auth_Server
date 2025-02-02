const User = require("../models/user")
const mongoose = require("mongoose")
const crypto = require("crypto")
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie")
const { sendVerificationEmail, welcomeEmail, resetPasswordEmail, newPasswordEmail } = require("../utils/sendEmail")



const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields." });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use." })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = (Math.floor(Math.random() * 900000) + 100000).toString();
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken: verificationToken,
            // verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000   // 24 hours
            verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000   // 15 min
        });
        generateTokenAndSetCookie(res, newUser._id);
        sendVerificationEmail(email, name, verificationToken);
        await newUser.save()
        res.status(201).json({ message: "Your account has been created successfully. Please verify your account" })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error.",
            error: error.message
        })
    }
}

const checkAuthBeforeVerifyEmail = async (req, res) => {
    try {
        // const user = await User.findById(req.userId).select("-password");
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User Not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "User is verified." })
        }
        res.status(200).json({ message: "Yes! User is not verified." })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error.", error: error.message })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User Not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "User is verified." })
        }
        const { code } = req.body;
        if (user.verificationToken != code) {
            return res.status(400).json({ message: "Invalid or Expire OTP" })
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        user.lastLogin = Date.now();
        await user.save()
        welcomeEmail(user.email, user.name)
        // const { password, ...rest } = user._doc
        return res.status(200).json({ message: "Congratulations! Your account is verified now." })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error.",
            error: error.message
        })
    }
}

const verifiedUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User Not found" });
        }
        if (!user.isVerified) return res.status(400).json({ message: "Email is not verified. Please verify it." });
        res.status(200).json({ message: user.name });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error.",
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields." });
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Provided email is not registered." });
        }
        if (!user.isVerified) return res.status(400).json({ message: "Email is not verified. Please verify it." });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = Date.now()
        await user.save();
        res.status(200).json({ message: "Login Successful." })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error.", error: error.message })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Please enter email." })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "Email is not registered." })
        }

        // Generate Reset Password Token
        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000   // 1 hour

        user.resetPasswordToken = resetPasswordToken
        user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt

        await user.save()

        // Send email
        await resetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)

        res.status(200).json({ message: "Reset password link send to your email." })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error.", error: error.message })
    }
}

const newPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ message: "Invalid or Expire reset password token." })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;

        await user.save();

        newPasswordEmail(user.email);
        res.status(200).json({ message: "Password reset successful" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error.", error: error.message })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: "Logged out successfully." })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error.", error: error.message })
    }
}



module.exports = {
    signup,
    checkAuthBeforeVerifyEmail,
    verifyEmail,
    verifiedUser,
    login,
    logout,
    forgotPassword,
    newPassword,
}