const router = require("express").Router();
const Web3Dbb = require("../models/web3db");
const HwUser = require("../models/User");
const User = require("../models/userSchema");
const orderMakingRoute = async (req, res) => {
  //order making  ROUTE:/api/web3/order
  console.log(req.body);
  const CUser = req.body.CUser;
  const HUser = req.body.HUser;
  const Lat = req.body.Lat;
  const Long = req.body.Long;
  const CPhone = req.body.CPhone;
  const Message = req.body.Message;
  const UserStage = "Approved";
  const HawkerStage = "Waiting";
  const ContractStage = "Waiting";
  const Hash = req.body.Hash;
  const Amt = 0;

  const newNote = new Web3Dbb({
    CUser: CUser,
    HUser: HUser,
    Lat: Lat,
    Long: Long,
    CPhone: CPhone,
    Message: Message,
    UserStage: UserStage,
    HawkerStage: HawkerStage,
    ContractStage: ContractStage,
    Hash: Hash,
    Amt: Amt,
    RejMessage: "no message for now"
  });
  console.log(newNote);
  newNote.save();
};

const getCustomer = async (req, res) => {
  // ROUTE:/api/web3/hawker

  //console.log(req.query.CUser);
  const name = req.query.CUser;

  Web3Dbb.find({ CUser: name, UserStage: "Approved" }).then((foundNotes) =>
    res.json(foundNotes)
  );
};

const customerDone = async (req, res) => {
  // ROUTE:/api/web3/hawkerdone

  //console.log(req.query.CUser);
  const name = req.query.CUser;
  ///IMPROVEMENT IN QUERY BELOW
  Web3Dbb.find({ CUser: name, ContractStage: "Completed" }).then((foundNotes) =>
    res.json(foundNotes)
  );
};

const acceptCustomer = async (req, res) => {
  //console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    {
      UserStage: req.body.UserStage,
      Amt: req.body.Amt,
      HawkerStage: "Success",
      ContractStage: "Completed",
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

const denyCustomer = async (req, res) => {
  //console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    {
      UserStage: "Cancelled",
      HawkerStage: "Failed",
      ContractStage: "Completed",
      RejMessage: "Customer cancelled the order"
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

const getHawker = async (req, res) => {
  // ROUTE:/api/web3/hawker

  //console.log(req.query.HUser);
  const name = req.query.HUser;

  Web3Dbb.find({ HUser: name, ContractStage: "Waiting" }).then((foundNotes) =>
    res.json(foundNotes)
  );
};

const hawkerDone = async (req, res) => {
  // ROUTE:/api/web3/hawkerdone

  //console.log(req.query.HUser);
  const name = req.query.HUser;

  Web3Dbb.find({ HUser: name, ContractStage: "Completed" }).then((foundNotes) =>
    res.json(foundNotes)
  );
};

const acceptHawker = async (req, res) => {
//  console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    { HawkerStage: "Accepted" },
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

const hawkerReach = async (req, res) => {
  //console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    { HawkerStage: "Reached" },
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

const hawkerRecieve = async (req, res) => {
 // console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    { ContractStage: "Completed", HawkerStage: "Successfully completed" },
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

const denyHawker = async (req, res) => {
  //console.log(req.body);
  Web3Dbb.updateOne(
    { _id: req.body.id },
    {
      HawkerStage: "Cancelled",
      UserStage: "Hawker Cancellation",
      ContractStage: "Completed",
      RejMessage: req.body.Message,
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


const admin = async (req, res) => {
  // ROUTE:/api/web3/admin

  Web3Dbb.find().then((foundNotes) => res.json(foundNotes));
};


const Hupdate = async (req, res) => {
  // ROUTE:/api/web3/hupdate
  let data=await HwUser.findOne({username:req.body.newname});
  if(data){
    res.status(400);
  }else{
  Web3Dbb.updateMany(
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
const Cupdate = async (req, res) => {
  // ROUTE:/api/web3/hupdate
  let data=await HwUser.findOne({username:req.body.newname});
  if(data){
    res.status(400);
  }else{
  Web3Dbb.updateMany(
    { HUser:req.body.CUser },
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
  orderMakingRoute,
  getCustomer,
  customerDone,
  acceptCustomer,
  denyCustomer,
  Hupdate,
  Cupdate,
  getHawker,
  hawkerDone,
  acceptHawker,
  hawkerReach,
  hawkerRecieve,
  denyHawker,
  admin,
};
