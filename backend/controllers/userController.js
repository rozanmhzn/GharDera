const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const SecretKey = "abcde54321";

const createToken = (_id) => {
  return jwt.sign({ _id }, SecretKey, { expiresIn: "1d" });
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

  // res.json({msg: "signup user", });
};


module.exports = {
  loginUser,
  signupUser
};
