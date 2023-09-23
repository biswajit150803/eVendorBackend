const mongoose = require("mongoose");
//hawker
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    url:{
      type: String,
      default: "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png"
    },
    aadhar:{
      type: String,
      required: true,
      unique: true,
    },
    blocked:{
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("HawkerUser", UserSchema);