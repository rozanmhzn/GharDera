const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    //required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

//static method

userSchema.statics.signup = async function (fullname, email, password, number) {
  //validation
  if (!fullname || !email || !password || !number) {
    // console.log(`fullname is ${fullname}`);
    throw Error("Please fill all fields..!!");
  }

  if (!validator.isEmail(email)) {
    throw Error("invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("strong passwor required.");
  }

  const exists = await this.findOne({ email });
  // const exists = await this.find({email : {email}, number : {number}})
  if (exists) {
    throw Error("Email already in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //const user = await this.create({ fullname, email, password: hash, number})
  // Create a new user instance
  const user = new this({
    fullname,
    email,
    password: hash,
    number,
  });

  // Save the user to the database
  await user.save();

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("email and password required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("user not found.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
