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

const toggle2FA = async (req, res) => {
  console.log(req.user);
  console.log(req.body);
  const { status } = req.body;
  const userID = req.user;
  try {
    const user = await User.findById(userID);

    if (!user) {
      res.status(404).json({ message: "User not found..!!" });
    }

    user.twoFAstatus = status;
    await user.save();
    if (status === true) {
      return res.status(200).json({ message: "Two-Factor Enabled" });
    } else {
      return res.status(200).json({ message: "Two-Factor Disabled" });
    }
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

const resendOTP = async (req, res) => {
  const userID = req.params.id;
  const user = await User.findById(userID);
  try {
    if (!user) {
      return res.status(404).json({ message: "User Not Found..!!" });
    }

    if (user.twoFAstatus) {
      const otp = await new TwoFA({
        userID: user._id,
        OTP_Code: generateOTP(),
      }).save();

      console.log(otp.OTP_Code);
      user.OTP_Code = otp.OTP_Code;
      await user.save();

      const message = `This is your One-Time-Password for login, ${otp.OTP_Code} \n
      This code is valid only for 60 seconds.`;
      await sendMail({
        email: user.email,
        subject: "OTP for login...!!",
        message: message,
      });

      await otp.deleteOne({ userID: user._id });

      res.status(200).json({ message: "OTP has been resent in your Email." });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { otp, id } = req.body;
  const user = await User.findById(id);
  try {
    const otpp = parseInt(otp);
    console.log(otpp, "Bodyy");
    if (!user) {
      return res.status(404).json({ message: "User Not Found..!!" });
    }

    const email = user.email;
    const fullname = user.fullname;
    const avatar = user.avatar;

    const lastUpdated = new Date(user.updatedAt);
    const expirationTime = new Date(lastUpdated.getTime() + 60000); // OTP expiration time of 1 minute

    const currentTime = new Date();
    if (currentTime > expirationTime) {
      console.log("yes");
      user.OTP_Code = null;
      await user.save();
    }
    console.log(user.OTP_Code, "user's model");

    if (otpp !== user.OTP_Code) {
      console.log("k vako??");
      return res
        .status(200)
        .json({ message: "Invalid OTP, please try again." });
    } else {
      const token = createToken(user);
      res
        .status(200)
        .json({ email, token, fullname, avatar, message: "Login Successfull" });
    }

    user.OTP_Code = null;
    await user.save();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const verifyUser = async (req, res) => {
  console.log(req.params.token);
  const token = req.params.token;
  const { otp } = req.body;
  const otpp = parseInt(otp, 10);
  console.log(otpp);

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, SecretKey);
    const userID = decoded.id;

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User Not Found..!!" });
    }
    const email = user.email;
    const fullname = user.fullname;

    if (!user.isVerified) {
      console.log("not verified...");
      user.isVerified = true;

      await user.save();
      await TwoFA.deleteOne({ userID: user._id });
    }

    if (otpp !== user.OTP_Code) {
      console.log("k vako??");
      res.status(200).json({ email, token, fullname });
      // return res
      //   .status(404)
      //   .json({ message: "Invalid OTP, please try again." });
    } else {
      user.OTP_Code = null;

      await user.save();
      // console.log("milyo haii milyoo");
      const token = createToken(user);

      res.status(200).json({ email, token, fullname });
    }

    user.OTP_Code = null;
    await user.save();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  toggle2FA,
  deActive2FA,
  resendOTP,
  verifyOTP,
  generateOTP,
  verifyUser,
};
