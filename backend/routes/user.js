const express = require("express");

//controllers
const { signupUser, loginUser } = require("../controllers/userController");

const router = express.Router();

//login routes
router.post("/login", loginUser);



module.exports = router;
