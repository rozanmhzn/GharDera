require("dotenv").config();

const jwt = require("jsonwebtoken");
const { createToken } = require("../middlewares/middleware");
const TwoFA = require("../models/otpModel");
const User = require("../models/userModel");
const sendMail = require("../utils/email");

const SecretKey = process.env.SECRET_KEY;


const generateOTP = () => {
  const OTPlength = 6;
  var digits = "0123456789";
  var OTP = "";

  for (let i = 0; i < OTPlength; i++) {
    var randomIndex = Math.floor(Math.random() * digits.length);
    OTP += digits[randomIndex];
  }
  return OTP;
};

const active2FA = async (req, res) => {
  console.log(req.user);
  const otp = generateOTP();
  console.log(otp);
  const userID = req.user;
  try {
    const user = await User.findById(userID);

    if (!user) {
      res.status(404).json({ message: "User not found..!!" });
    }

    user.twoFAstatus = true;
    await user.save();

    return res.status(200).json({ message: "Two-Factor Enabled" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const deActive2FA = async (req, res) => {
  console.log(req.user);
  const userID = req.user;
  try {
    const user = await User.findById(userID);

    if (!user) {
      res.status(404).json({ message: "User not found..!!" });
    }

    user.twoFAstatus = false;
    await user.save();

    return res.status(200).json({ message: "Two-Factor Disabled" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports={
    generateOTP,
    active2FA,
    deActive2FA
}