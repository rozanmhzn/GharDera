const express = require("express");

const { verifyToken } = require("../middlewares/middleware");
const {
  loginUser,
  authorizeRole,
  signupUser,
} = require("../controllers/userController");

const {
  active2FA,
  deActive2FA,
  verifyUser,
  resendOTP,
  verifyOTP,
} = require("../controllers/twoFactorController");


const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post("/user/active2fa/", verifyToken, authorizeRole("user"), active2FA);

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