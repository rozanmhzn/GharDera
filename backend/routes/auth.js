const express = require("express");

const { verifyToken } = require("../middlewares/middleware");
const {
  active2FA,
  deActive2FA,
} = require("../controllers/twoFactorController");


const router = express.Router();

router.post("/user/active2fa/", verifyToken, authorizeRole("user"), active2FA);

router.post(
  "/user/deactive2fa/",
  verifyToken,
  authorizeRole("user"),
  deActive2FA
);

module.exports = router;