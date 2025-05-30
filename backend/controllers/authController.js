const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// generate jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl} = req.body;

        // note: check if user already exists
        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        // info: hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // info: create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        // Return user data with jwt
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message:"Server error", error: error.message });
    }
};

// @desc Login a user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    res.status(200).json({ message: "Login route works" });
};

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private ( require JWT)
const getUserProfile = async (req, res) => {
    res.status(200).json({ message: "Profile route works" });
};


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};