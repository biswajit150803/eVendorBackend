const router = require("express").Router();
const Pin = require("../models/Pin");

const newPin = async (req, res) => {
  const orders = await Pin.updateOne(
    {
      username: req.body.username,
    },
    {
      lat: req.body.lat,
      long: req.body.long,
      title: req.body.title,
      desc: req.body.desc,
      items: req.body.items,
    },
    {
      upsert: true,
    }
  );
 // console.log(orders);
};

const delpin = async (req, res) => {
  const orders = await Pin.deleteOne({
    username: req.body.username,
  });
 // console.log(orders);
};

const getAllPins = async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
    //console.log();
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePin = async (req, res) => {
  Pin.updateMany(
    { username: req.body.username },
    {
      lat: req.body.lat,
      long: req.body.long,
    },
    function (err, raw) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        console.log(raw);
        res.status(200);
        res.send();
      }
    }
  );
};

const getPinByCategory = async (req, res) => {
  try {
    console.log(req.query);
    const cat = req.query.Category;
    const pins = await Pin.find({ title: cat });
    res.status(200).json(pins);
    console.log(req.query);
  } catch (err) {
    res.status(500).json(err);
  }
};

const blockUser = async (req, res) => {
  //api/pins/block
  const orders = await User.updateOne(
    {
      username: req.body.username,
    },
    {
      blocked: true,
    },
    {
      upsert: true,
    }
  );
  console.log(orders);
};

const updatePinname = async(req,res) => {
  let data=await Pin.findOne({username:req.body.newname});
  if(data){
    res.status(400);
  }else{
    Pin.updateOne(
      { username:req.body.HUser },
      {
        username:req.body.newname
      },
      function (err, raw) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          console.log(raw);
          res.status(200);
          res.send();
        }
      }
    );
  }
};

module.exports = {
  newPin,
  delpin,
  getAllPins,
  updatePin,
  getPinByCategory,
  blockUser,
  updatePinname
};
