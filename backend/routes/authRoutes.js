const express = require("express");
const {registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser); //info: register user
router.post("/login", loginUser); // info: login user
router.get("/profile", protect, getUserProfile); // info: get user profile

module.exports = router;
