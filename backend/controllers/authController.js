const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// note: GENERATE JWT TOKEN
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//  @desc REGISTER A NEW USER
//  @ROUTE POST /API/AUTH/REGISTER
//  @ACCESS PUBLIC

const registerUser = async (req, res) => {

}

//  @desc LOGIN A USER
//  @ROUTE POST /API/AUTH/LOGIN
//  @ACCESS PUBLIC
const loginUser = async (req, res) => {

}

//  @desc GET USER PROFILE
//  @ROUTE GET /API/AUTH/PROFILE
//  @ACCESS PRIVATE (ONLY AUTHENTICATED USERS)
const getUserProfile = async (req, res) => {

};

module.exports = { registerUser, loginUser, getUserProfile };