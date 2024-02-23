require("dotenv").config();

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const SecretKey = process.env.SECRET_KEY;

//creating JWT token
const createToken = (user) => {
  const payload = {
    userID: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, SecretKey, { expiresIn: "1h" });
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
  console.log(authToken);
  //verifying token
  jwt.verify(authToken, SecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded.userID;
    req.role = decoded.role;
    console.log(req.user);
    console.log(decoded.role);
    console.log("completed");
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

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // const token = createToken(user._id, user.email, user.role); //creating token
    const token = createToken(user);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //res.json({   msg: "login user",});
};

//signup user
const signupUser = async (req, res) => {
  const { fullname, email, password, number } = req.body;

  try {
    const user = await User.signup(fullname, email, password, number);

    const token = createToken(user); //creating token

    res.status(200).json({ email, token });
  } catch (error) {
    //console.log(fullname)
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
    // console.log(user)

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
  try {
    if (!oldpassword || !newpassword) {
      throw new Error("Please fill all fields..!!");
    }

    if (!validator.isStrongPassword(newpassword)) {
      throw Error("strong password required.");
    }
    const user = await User.findById(userID);

    if (!user) {
      throw Error("User not found.!!");
    }

    const match = await bcrypt.compare(oldpassword, user.password);
    if (!match) {
      throw new Error("incorrect password");
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newpassword, salt);

    user.password = password;
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//user Logout
const logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout successfull" });
};

//update profile for user
const updateProfile = async (req, res) => {
  const userID = req.user;
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

    res.status(200).json({ message: "Reset Link have been sent on email." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//resetPassword for user
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
  

    // Verify JWT token
    const decoded = jwt.verify(token, SecretKey);
    const email = decoded.email;
    console.log(email);

    if (!validator.isStrongPassword(newPassword)) {
      throw Error("strong password required.");
    }

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
    res.status(400).json({ error: err.message });
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
