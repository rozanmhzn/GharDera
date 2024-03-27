const TourDate = require("../models/bookingModel");
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


module.exports = {bookTour}
