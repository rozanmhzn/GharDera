const {TourDate, savedProperty} = require("../models/bookingModel");
const Property = require("../models/propertyModel");


//property visit booking
const bookTour = async (req, res) => {
  const { propertyID, date } = req.body;
  const userID = req.user;
  const property = await Property.findById(propertyID);

  if (!userID) {
    return res.status(404).json({ message: "Authentication required..!!" });
  }

  if (!property) {
    return res.status(404).json({ message: "Property not found...!!" });
  }
  try {
    const book = new TourDate({
      bookedBy: userID,
      property: propertyID,
      date: date,
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
      .populate({ path: "bookedBy", select: ["fullname", "email"] })
      .populate({ path: "property", select: "title" });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//for user get all individual bookings
const getUserBooking = async (req, res) => {
  const userID = req.params.id;
  if (!userID) {
    return res.status(404).json({ message: "Authentication required..!!" });
  }

  try {
    const booking = await TourDate.find({ bookedBy: userID })
      .populate({ path: "bookedBy", select: "fullname" })
      .populate({ path: "property", select: "title" });

    res.status(200).json({ booking });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

//for admin get each booking
const getBooking = async (req, res) => {
  const bookingID = req.params.id;
  try {
    const booking = await Booking.findById(bookingID)
      .populate({ path: "bookedBy", select: ["fullname", "email"] })
      .populate({ path: "property", select: "title" });

    res.status(200).json({ booking });
  } catch (err) {
    return res.status(404).json(err.message);
  }
};

//for admin confirm each bookings
const confirmBooking = async (req, res) => {
  const bookingID = req.params.id;
  const { email, status, date } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingID,
      { $set: { status: status } },
      { new: true }
    );

    await sendMail({
      email: email,
      subject: "Confirmation on Property Tour Date Booking..!!",
      message: `We've confirmed your tour date for ${date}..!!\n\nThank You..!!`,
    });

    res.status(200).json({
      updatedBooking,
      status: "Success",
      message: "Booking Confirmed.",
    });
    //res.send("Booking done.!");
  } catch (err) {
    return res.status(404).json(err.message);
  }
};

//for saving favourite properties
const addFavourites = async (req, res) => {
  const userID = req.user;
  const {propertyID} = req.body;
 // console.log(userID);
 // console.log(propertyID);

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

module.exports = {
    bookTour,
    getBookings,
    getUserBooking,
    getBooking,
    confirmBooking,
    addFavourites
}
