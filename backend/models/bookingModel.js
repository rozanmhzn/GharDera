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

const TourDate = mongoose.model("TourDate", tourBookingSchema);

module.exports = { TourDate };
