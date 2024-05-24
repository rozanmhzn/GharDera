require("dotenv").config();

const Property = require("../models/propertyModel");
const Inquiry = require("../models/inquiryModel");
const sendMail = require("../utils/email");


//create a listing or post a property
const addProperty = async (req, res) => {
 
  try {
    //Posting property
    const property = await Property.create(req.body);
    return res.status(200).json({ message: "Property Added" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Get all listings or property
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    res.status(200).json(properties);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//Get property or listing by ID

const getPropertyByID = async (req, res) => {
  try {
    const propertyID = await Property.findById(req.params.id);
    if (!propertyID) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(propertyID);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//update listing or property
const updateListing = async (req, res) => {
  //searching for property by ID
  const propertyID = await Property.findById(req.params.id);

  //if not found
  if (!propertyID) {
    return res.status(404).json({ message: "Property not found" });
  }

  try {
    //updates property details by ID
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ updatedProperty, message: "Property Updated Successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//delete listing or property
const deleteListing = async (req, res) => {
  //searching for property by ID
  const propertyID = await Property.findById(req.params.id);
  if (!propertyID) {
    return res.status(404).json({ message: "Property not found...!!" });
  }

  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Property Deleted successfully...!!" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Searching properties
const searchListing = async (req, res) => {
  console.log(req.body);
  try {
    let query = {};
    let {
      minPrice,
      maxPrice,
      propertyAddress,
      propertyStatus,
      propertyType,
      propertyCategory,
    } = req.query;

    //filter option
    console.log(
      minPrice,
      maxPrice,
      propertyAddress,
      propertyStatus,
      propertyType,
      propertyCategory
    );
    if (propertyAddress) {
      query["propertyAddress.street"] = {
        $regex: propertyAddress,
        $options: "i",
      };
    }
    if (propertyCategory) {
      propertyCategory = propertyCategory.toLowerCase();
      query.propertyCategory = propertyCategory;
    }
    if (propertyType) {
      propertyType = propertyType.toLowerCase();
      query.propertyType = propertyType;
    }

    if (propertyStatus) {
      propertyStatus = propertyStatus.toLowerCase();
      query.propertyStatus = propertyStatus;
    }
    if (minPrice) {
      query.propertyPrice = {}; // Ensure initialization if undefined
      query.propertyPrice.$lte = parseFloat(minPrice);
    }
    if (maxPrice) {
      query.propertyPrice = {}; // Ensure initialization if undefined
      query.propertyPrice.$gte = parseFloat(maxPrice);
    }
    if (minPrice && maxPrice) {
      query.propertyPrice = {};
      query.propertyPrice = {
        $gte: parseFloat(minPrice),
        $lte: parseFloat(maxPrice),
      };
    }
    console.log(query);

    const results = await Property.find(query);

    res.status(200).json({ results });
  } catch (err) {
    console.log(err);

    res.status(404).json(err.message);
  }
};

//inquiry form submission
const submitInquiry = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(404).json({ message: "Fill all required fields...!!" });
  }
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(200).json({ message: "Inquiry submitted" });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//get all inquiries for admin
const getInquiries = async (req, res) => {
  try {
    const inquiry = await Inquiry.find().populate([{ path : 'property', select : 'title'}]);
    res.status(200).json({ inquiry });
  } catch (err) {
    return res.status(404).json(err.message);
  }
};

//get each inquiry for admin

const getInquiry = async (req, res)=>{
  const inquiryId = req.params.id;

  try{
    const inquiry = await Inquiry.findById(inquiryId).populate([{path :'property', select : 'title'}]);
    if(!inquiry){
      return res.status(404).json({message : "Property not found..!!"});
    }

    res.status(200).json({inquiry});
  }
  catch(err){
    return res.status(404).json(err.message)
  }
}

//reply to inquiry
const replyInquiry = async(req, res) =>{
  try{
const  {email, message} = req.body;
    if(!message && !email){
      return res.status(404).json({message : "Please fill required fields..!!"});
    }
    await sendMail({
      email : email,
      subject : "Reply to Inquiry..!!",
      message : message
    })
    res.status(200).json({status : "success" ,message : "Inquiry replied..!!"});
  }
  catch(err){
    return res.status(404).json(err.message);
  }
}

module.exports = {
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
 
};