const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    bathroom: {
      type: Number,
      //required: true,
    },
    bedroom: {
      type: Number,
      // required: true,
    },
    floors: {
      type: Number,
    },
    imagesURL: {
      type: Array,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    negotiable: {
      type: Boolean,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
