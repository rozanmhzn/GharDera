const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname:{
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
    required: true,
  },
});

//static method

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
