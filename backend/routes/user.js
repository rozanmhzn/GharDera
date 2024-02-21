const express = require("express");

//controllers
const { signupUser, loginUser, verifyToken, changePassword } = require("../controllers/userController");

const router = express.Router();

//login routes
router.post("/login", loginUser);

//signup routes
router.post("/signup", signupUser);


//Update password route
router.put("/user/_id/changepassword",verifyToken, changePassword);

module.exports = router;
