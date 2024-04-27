const { TourDate, savedProperty } = require("../models/bookingModel");
const Property = require("../models/propertyModel");
const User = require("../models/userModel");
const sendMail = require("../utils/email");

//property visit booking
const bookTour = async (req, res) => {
  //console.log(req.body)
  const { property, date, time } = req.body;
  const userID = req.user;
  const propertyID = await Property.findById(property);

  if (!userID) {
    return res.status(404).json({ message: "Authentication required..!!" });
  }

  if (!propertyID) {
    return res.status(404).json({ message: "Property not found...!!" });
  }
  try {
    const book = new TourDate({
      bookedBy: userID,
      property: property,
      date: date,
      time: time,
    });

    await TourDate.create(book);
    res.status(200).json({ book, message: "Booking Successfull..!!" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//for admin get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await TourDate.find()
      .populate([{ path: "bookedBy", select: ["fullname", "email"] }])
      .populate({
        path: "property",
        select: ["propertyTitle", "propertyAddress"],
      });
    console.log(bookings);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//for user get all individual bookings
const getUserBooking = async (req, res) => {
  //const userID = req.params.id;
  const userID = req.user;
  if (!userID) {
    return res.status(404).json({ message: "Authentication required..!!" });
  }

  try {
    const booking = await TourDate.find({ bookedBy: userID })
      // .populate({ path: "bookedBy", select: "fullname" })
      .populate({
        path: "property",
        select: ["propertyTitle", "propertyAddress", "ImagesURL"],
      });

    res.status(200).json({ booking });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//for admin get each booking
const getBooking = async (req, res) => {
  const bookingID = req.params.id;
  try {
    const booking = await TourDate.findById(bookingID)
      .populate({ path: "bookedBy", select: ["fullname", "email"] })
      .populate({
        path: "property",
        select: ["propertyTitle", "propertyAddress", "propertyPrice"],
      });

    res.status(200).json({ booking });
  } catch (err) {
    return res.status(404).json(err.message);
  }
};

//for admin confirm each bookings
const confirmBooking = async (req, res) => {
  console.log(req.body);
  const bookingID = req.params.id;
  const email = req.body.bookedBy.email;
  const { status, date, time } = req.body;
  const propertyName = req.body.property.propertyTitle;
  const { street, city } = req.body.property.propertyAddress;

  try {
    const updatedBooking = await TourDate.findByIdAndUpdate(
      bookingID,
      { $set: { status: status } },
      { new: true }
    );

    await sendMail({
      email: email,
      subject: "Confirmation on Property Tour Date Booking..!!",
      message: `We've confirmed your tour date for ${date} at ${time} for property ${propertyName} located at ${street}, ${city}..!!\n\nThank You..!!`,
    });

    res.status(200).json({
      updatedBooking,
      status: "Success",
      message: "Booking Confirmed.",
    });
  } catch (err) {
    return res.status(404).json(err.message);
  }
};

//for saving favourite properties

const addFavourites = async (req, res) => {
  const userID = req.user;
  const { propertyID } = req.body;
  
  if (!userID) {
    return res.status(404).json({ message: "Authentication required..!!" });
  }

  try {
    const favourite = new savedProperty({
      savedBy: userID,
      property: propertyID,
    });
    await savedProperty.create(favourite);

    res.status(200).json({ favourite });
  } catch (err) {
    return res.status(404).json(err.message);
  }
};

//for getting Each saved properties
const getEachFavourites = async (req, res) => {
  const userID = req.user;
  const propertyID = req.params.id;
  if (!userID) {
    return res.status(404).json({ message: "Authentication required..!!" });
  }
  try {
    const property = await Property.findById(propertyID);
    if (!property) {
      return false;
    }
    const favProps = await savedProperty.findOne({
      savedBy: userID,
      property: propertyID,
    });
    res.status(200).json({ favProps });
  } catch (err) {
    return res.status(404).json(err.message);
  }
};
//for getting saved properties
const getFavourites = async (req, res) => {
  const userID = req.user;
  try {
    const favProps = await savedProperty
      .find({ savedBy: userID })
      .populate([
        {
          path: "property",
          select: [
            "propertyTitle",
            "propertyAddress",
            "propertyPrice",
            "ImagesURL",
          ],
        },
      ]);

    res.status(200).json({ favProps });
  } catch (err) {
    return res.status(404).json(err.message);
  }
};

//for deleting saved properties
const deleteFavourites = async (req, res) => {
  const userID = req.user;
  const { propertyID } = req.body;
  try {
    await savedProperty.deleteOne({ savedBy: userID, property: propertyID });
    res.status(200).json({ message: "Removed favorite property..!!" });
  } catch (err) {
    return res.status(404).json(err.message);
  }
};

module.exports = {
  bookTour,
  getBookings,
  getUserBooking,
  getBooking,
  confirmBooking,
  addFavourites,
  getFavourites,
  deleteFavourites,
  getEachFavourites,
};
