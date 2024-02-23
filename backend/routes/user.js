const express = require("express");

//controllers
const {
  signupUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUserbyID,
  verifyToken,
  profile,
  changePassword,
  logoutUser,
  authorizeRole,
  updateProfile,
  updateUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const router = express.Router();

/**Routes for authentication and registration */

//login routes
router.post("/login", loginUser); 

//signup routes
router.post("/signup", signupUser); 

//logout route
router.post("/logout", verifyToken, logoutUser); 

/*Routes for regular user*/

//Get profile information for user
router.get("/user/profile", verifyToken, authorizeRole("user"), profile); 

//router for updating profile for user
router.put("/user/profile", verifyToken, authorizeRole("user"), updateProfile); 

//Change password route for user
router.put(
  "/user/settings/changepassword",
  verifyToken,
  authorizeRole("user"),
  changePassword
); 

//delete User route for user
router.delete(
  "/user/profile/:userId",
  verifyToken,
  authorizeRole("user"),
  deleteUser
); 

//Forgot password route for user
router.post("/user/forgot-password", forgotPassword); 

//reset password route for user
router.post("/user/reset-password", resetPassword); 

///////

/*Routes for admin user*/

//getAllUser route for admin
router.get("/admin/users", verifyToken, authorizeRole("admin"), getAllUsers); 

//get single user route for admin
router.get(
  "/admin/users/:id",
  verifyToken,
  authorizeRole("admin"),
  getUserbyID
); 

//update users detail for admin
router.put("/admin/users/:id", verifyToken, authorizeRole("admin"), updateUser); 

//delete User route for admin
router.delete(
  "/admin/users/:userId",
  verifyToken,
  authorizeRole("admin"),
  deleteUser
); 

//Change password route for admin
router.put(
  "/admin/settings/changepassword",
  verifyToken,
  authorizeRole("admin"),
  changePassword
); 

module.exports = router;
