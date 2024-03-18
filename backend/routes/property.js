const { Router } = require("express");
const {
  addProperty,
} = require("../controllers/propertyController");
const { verifyToken, authorizeRole } = require("../controllers/userController");

const router = Router();






//route for posting property
router.post('/admin/property',verifyToken, authorizeRole("admin") ,addProperty);