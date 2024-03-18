const { Router } = require("express");
const {
  addProperty,
  getProperties
} = require("../controllers/propertyController");
const { verifyToken, authorizeRole } = require("../controllers/userController");

const router = Router();


//route for getting all properties
router.get('/user/properties', getProperties)


//route for getting all properties
router.get('/admin/properties', verifyToken, authorizeRole("admin") ,getProperties);



//route for posting property
router.post('/admin/property',verifyToken, authorizeRole("admin") ,addProperty);