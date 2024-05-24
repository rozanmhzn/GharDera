const express = require("express");

const { verifyToken } = require("../middlewares/middleware");
const {
  loginUser,
  authorizeRole,
  signupUser,
} = require("../controllers/userController");

const {
  deActive2FA,
  verifyUser,
  resendOTP,
  verifyOTP,
  toggle2FA,
} = require("../controllers/twoFactorController");


const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post("/user/toggle2FA/", verifyToken, authorizeRole("user"), toggle2FA);

router.post(
  "/user/deactive2fa/",
  verifyToken,
  authorizeRole("user"),
  deActive2FA
);

router.post("/verifyuser/:token", verifyUser);

router.post("/resend-otp/:id", resendOTP);

router.post("/verifyOTP", verifyOTP);

module.exports = router;