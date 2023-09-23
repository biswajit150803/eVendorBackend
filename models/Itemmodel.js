const mongoose = require("mongoose");

const ItemmodelSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },    
    item:{
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemmodelSchema);
//pass as an object...current usernname and itemn name which was added
//itemmodel to be updated on add/delete click
//pins model to be updated on submit
//on buisness hour off all item model with that username has to be deleted.