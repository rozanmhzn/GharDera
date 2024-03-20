const { Router } = require("express");
const {
  addProperty,
  getProperties,
  getPropertyByID
} = require("../controllers/propertyController");
const { verifyToken, authorizeRole } = require("../controllers/userController");

const router = Router();


//route for getting all properties
router.get('/user/properties', getProperties)

//route for getting details of specific property
router.get('/user/properties/:id', getPropertyByID);


//route for getting all properties
router.get('/admin/properties', verifyToken, authorizeRole("admin") ,getProperties);


//route for posting property
router.post('/admin/property',verifyToken, authorizeRole("admin") ,addProperty);

//route for getting specific property
router.get('/admin/properties/:id', verifyToken, authorizeRole("admin") ,getPropertyByID);