const express = require("express");

//controllers
const { signupUser, loginUser } = require("../controllers/userController");

const router = express.Router();

//login routes
router.post("/login", loginUser);

//signup routes
router.post("/signup", signupUser);

module.exports = router;
