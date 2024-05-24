require("dotenv").config();

const User = require("../models/userModel");
const OTP = require("../models/otpModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/email");
const { generateOTP } = require("./twoFactorController");

const SecretKey = process.env.SECRET_KEY;

//creating JWT token
const createToken = (user) => {
  const payload = {
    userID: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, SecretKey, { expiresIn: "1d" });
};

//middleware for knowing whether user is authenticated or not
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  //checking if token is provided or not
  if (!token) {
    return res.status(401).json({ message: "No token Provided" });
  }

  // Extracting token from the header
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }
  const authToken = tokenParts[1];
  //verifying token
  jwt.verify(authToken, SecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded.userID;
    req.role = decoded.role;
    next();
  });
};

//middleware for authorization of routes based on roles
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.role === role) {
      next();
    }
    //console.log(req.role);
    else {
      res.status(403).json({ message: "Access Denied" });
    }
  };
};

//2FA-login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw Error("email and password required");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("user not found.");
    }

    const fullname = user.fullname;
    const avatar = user.avatar;
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(404).json({ message: "Incorrect Password" });
    }

    if (!user.isVerified) {
      return res
        .status(200)
        .json({ message: "Please verify your account first..!!" });
    }

    if (user.twoFAstatus) {
      const otp = await new OTP({
        userID: user._id,
        OTP_Code: generateOTP(),
      }).save();

      user.OTP_Code = otp.OTP_Code;
      await user.save();

      const message = `This is your One-Time-Password for login, ${otp.OTP_Code} \n
      This code is valid only for 60 seconds.`;
      await sendMail({
        email: email,
        subject: "OTP for login...!!",
        message: message,
      });

      await otp.deleteOne({ userID: user._id });

      res
        .status(200)
        .json({ id: user._id, message: "OTP has been sent in your Email." });
    }
    else {
      const token = createToken(user);

      res
        .status(200)
        .json({ email, token, fullname, avatar, message: "Login Successfull" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  console.log(req.body);
  const { fullname, email, password, number } = req.body;
  try {
    const user = await User.signup(fullname, email, password, number);
    const fullName = user.fullname;
    console.log(fullName);

    //for Verification
    if (!user.isVerified) {
      const otp = await new OTP({
        userID: user._id,
        OTP_Code: generateOTP(),
      }).save();

      user.OTP_Code = otp.OTP_Code;
      await user.save();

      //Generating reset Token
      const verifyUserToken = jwt.sign({ id: user._id }, SecretKey, {
      });
      console.log(verifyUserToken);

      const verifyURL = `${req.protocol}://localhost:3000/verifyuser/${verifyUserToken}`;
      const message = `We got a Signup request. Please click the link below to verify your account and enter the OTP ${otp.OTP_Code}.\n\n
    ${verifyURL}\n\n\n`;

      await sendMail({
        email: email,
        subject: "OTP for Account Verification...!!",
        message: message,
      });

      res
        .status(200)
        .json({ message: "Verifaction OTP has been sent in your Email." });
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//Get all user after authentication for admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    //console.log(users[0]._id);
    res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
  }
};

//delete User
const deleteUser = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.userId;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    // Return a success message
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//route for accessing indivual user's information for admin

const getUserbyID = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//get own details
const profile = async (req, res) => {
  console.log(req.user);
  try {
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//password change
const changePassword = async (req, res) => {
  const userID = req.user;
  const { oldpassword, newpassword } = req.body;
  console.log(userID, oldpassword, newpassword);
  try {
    const user = await User.findById(userID);

    if (!user) {
      throw Error("User not found.!!");
    }

    const match = await bcrypt.compare(oldpassword, user.password);
    if (!match) {
      return res.status(404).json({ message: "Old password did not match." });
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newpassword, salt);

    user.password = password;
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    return res.status(404).json({ err });
  }
};

//user Logout
const logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout successfull" });
};

//update profile for user
const updateProfile = async (req, res) => {
  const userID = req.user;
  try {
    const user = await User.findById(userID);

    if (!user) {
      throw Error("User not found.!!");
    }
    console.log(req.body);

    const updatedProfile = await User.findByIdAndUpdate(userID, req.body, {
      new: true,
    });

    return res
      .status(200)
      .json({
        status: 200,
        updatedProfile,
        message: "Profile updated successfully",
      });
  } catch (err) {
    return res.status(404).json({ status: 404, error: err.message });
  }
};

//update user for admin
const updateUser = async (req, res) => {
  const userID = req.params.id;
  const { fullname, number } = req.body;
  try {
    const user = await User.findById(userID);

    if (!user) {
      throw Error("User not found.!!");
    }
    user.fullname = fullname;
    user.number = number;
    await user.save();
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//forgot password for user
const forgotPassword = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found..!!" });
    }

    //Generating reset Token
    const resetToken = jwt.sign({ email: email }, SecretKey, {
      expiresIn: "1h",
    });
    console.log(resetToken);

    const resetURL = `${req.protocol}://localhost:3000/resetpassword/${resetToken}`;
    const message = `We got a request to reset your password. Please click the link below to reset your password.\n\n
    ${resetURL}\n\n\n This link will expire on 1 hour.`;

    await sendMail({
      email: email,
      subject: `Reset Your Password..!!`,
      message: message,
    });

    res
      .status(200)
      .json({
        status: "success",
        message: "Reset Link have been sent on email.",
      });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//resetPassword for user
const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { newPassword } = req.body;

    // Verify JWT token
    const decoded = jwt.verify(token, SecretKey);
    const email = decoded.email;
    console.log(email);

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUserbyID,
  verifyToken,
  profile,
  changePassword,
  logoutUser,
  authorizeRole,
  updateProfile,
  updateUser,
  forgotPassword,
  resetPassword,
};
