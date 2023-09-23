const router = require("express").Router();
const ItemModel = require("../models/Itemmodel");

const createItemOrder = async (req, res) => {
  const newOrder = new ItemModel(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteItemOrder = async (req, res) => {
  const itemOrders = await ItemModel.deleteOne(
    {
      username: req.body.username,
    },
    {
      function(err, result) {
        if (err) {
          console.log("Error in deleting the item with username.....", err);
        }
      },
    }
  );
  console.log(itemOrders);
};

const deleteAllItemOrders = async (req, res) => {
  const itemOrders = await ItemModel.deleteMany(
    {
      username: req.body.username,
    },
    {
      function(err, result) {
        if (err) {
          console.log(
            "Error in deleting all the items with username.....",
            err
          );
        }
      },
    }
  );
  console.log(itemOrders);
};

const getOrders = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
    console.log();
  } catch (err) {
    res.status(500).json(err);
  }
};

const Itemupdate = async (req, res) => {
  // ROUTE:/api/web3/hupdate
  let data=await ItemModel.findOne({username:req.body.newname});
  if(data){
    res.status(400);
  }else{
  ItemModel.updateMany(
    { HUser:req.body.HUser },
    {
      HUser:req.body.newname
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
  createItemOrder,
  deleteItemOrder,
  deleteAllItemOrders,
  getOrders,
  Itemupdate
};
