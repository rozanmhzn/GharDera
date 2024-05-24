const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    propertyStatus: {
      type: String,
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    propertyDescription: {
      type: String,
      required: true,
    },
    propertyPrice: {
      type: Number,
      required: true,
    },
    propertyCategory: {
      type: String,
      required: true,
    },
    propertyAddress: {
      type: Object,
      required: true,
    },
    propertyFeature: {
      type: Array,
    },
    parking: {
      type: Number,
    },
    bathroom: {
      type: Number,
      //required: true,
    },
    bedRooms: {
      type: Number,
      // required: true,
    },
    kitchens: {
      type: Number,
    },
    floors: {
      type: Number,
    },
    ImagesURL: {
      type: Array,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    propertyArea: {
      type: String,
      required: true,
    },
    negotiable: {
      type: Boolean,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    ownerNumber: {
      type: String,
      required: true,
    },
    propertyFace: {
      type: String,
      required: true,
    },
    roadAccess: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Available",
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
