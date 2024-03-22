require("dotenv").config();

const Property = require("../models/propertyModel");


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

module.exports = {
  addProperty,
  getProperties,
  getPropertyByID,
  updateListing,
  deleteListing
 
};