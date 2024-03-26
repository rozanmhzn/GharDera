const { Router } = require("express");
const {
  addProperty,
  getProperties,
  getPropertyByID,
  updateListing,
  deleteListing,
  searchListing,
  submitInquiry,
  getInquiries,
  getInquiry,
  replyInquiry
} = require("../controllers/propertyController");
const { verifyToken, authorizeRole } = require("../controllers/userController");

const router = Router();


//route for getting all properties
router.get('/user/properties', getProperties)

//route for getting details of specific property
router.get('/user/properties/:id', getPropertyByID);

//route for searching
router.get('/search', searchListing)

//route for submitting inquiry form
router.post('/user/inquiry/', submitInquiry)


//route for getting all properties
router.get('/admin/properties', verifyToken, authorizeRole("admin") ,getProperties);


//route for posting property
router.post('/admin/property',verifyToken, authorizeRole("admin") ,addProperty);

//route for getting specific property
router.get('/admin/properties/:id', verifyToken, authorizeRole("admin") ,getPropertyByID);

//route for updating property
router.put('/admin/property/:id',verifyToken,authorizeRole("admin") ,updateListing);

//route for deleting property
router.delete('/admin/property/:id',verifyToken, authorizeRole("admin") ,deleteListing);

//route for getting all inquiries
router.get('/admin/inquiries',verifyToken,authorizeRole("admin") ,getInquiries);

//route for getting individual inquiry
router.get('/admin/inquiry/:id',verifyToken,authorizeRole("admin") , getInquiry);

//route for replying to inquiry
router.post('/admin/inquiry/reply',verifyToken,authorizeRole("admin") , replyInquiry);

module.exports = router;