const { createCustomer, loginCustomer,updateCustomername,updatepass } = require("../controllers/customerController");
const User = require("../models/userSchema");
const router = require("express").Router();
const bcrypt = require("bcrypt");
///////////////////For customers  ///////////////////////////
//REGISTER
router.post("/register", createCustomer);

//LOGIN
router.post("/login",loginCustomer);
router.post("/login",loginCustomer);
router.post("/updatecus",updateCustomername);
router.post("/updatepass",updatepass);

module.exports = router;