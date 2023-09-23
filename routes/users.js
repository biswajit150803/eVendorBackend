const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

const Pin = require("../models/Pin");
const {
  register,
  login,
  block,
  admin,
  updateHawkername,
  updateHawkerurl,
  updatepass,
  mailer,
  verifyOtp,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/uurl", updateHawkerurl);
router.post("/uname", updateHawkername);
router.post("/login", login);
router.post("/block", block);
router.get("/admin", admin);
router.post("/updatepass", updatepass);
router.post("/send-email-otp",mailer);
router.post("/verify-otp",verifyOtp)

module.exports = router;
