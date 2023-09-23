const router = require("express").Router();
const {
  newPin,
  delpin,
  getAllPins,
  updatePin,
  getPinByCategory,
  blockUser,
  updatePinname
} = require("../controllers/pinController");
const Pin = require("../models/Pin");

//create a pin
router.post("/", newPin);

router.post("/del", delpin);
//get all pins
router.get("/", getAllPins);

router.post("/updatepins", updatePin);
router.post("/updatepinname", updatePin);

router.get("/category", getPinByCategory);
router.post("/block", blockUser);

module.exports = router;
