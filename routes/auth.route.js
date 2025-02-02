const { signup, login, logout, verifyEmail, forgotPassword, newPassword, checkAuthBeforeVerifyEmail, verifiedUser } = require("../controllers/auth")
const verifyToken = require("../middlewares/verifyToken")
const express = require("express")
const router = express.Router();

router.post("/signup", signup)
router.get("/before-verify-email", verifyToken, checkAuthBeforeVerifyEmail)
router.post("/verify-email", verifyToken, verifyEmail)
router.get("/verified-user", verifyToken, verifiedUser)
router.post("/login", login)
router.get("/logout", logout)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", newPassword)

module.exports = router