const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
      max: 60,
    },
    desc: {
      type: String,
      required: true,
      min: 3,
    },
    long: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    blocked:{
      type: Boolean,
      default: false,
      required:true,
    },
    //array of items to be added
    items:{
      type: [String],
      default: [],
      required:true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
