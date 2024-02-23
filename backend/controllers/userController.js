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

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id); //creating token

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { fullname, email, password, number } = req.body;

  try {
    const user = await User.signup(fullname, email, password, number);

    const token = createToken(user._id); //creating token

    res.status(200).json({ email, token });
  } catch (error) {
    //console.log(fullname)
    res.status(400).json({ error: error.message });
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

module.exports = {
  loginUser,
  signupUser,
  verifyToken,
  changePassword,
};
