const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tourBookingSchema = new Schema({
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  date: {
    type: Date,
    requied: true,
  },
  status: {
    type: String,
    default: false,
  },
});

const savedSchema = new Schema({
  savedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
});

const TourDate = mongoose.model("TourDate", tourBookingSchema);
const savedProperty = mongoose.model("Favourites", savedSchema);

module.exports = { TourDate, savedProperty };
