const router = require("express").Router();
const {
  createItemOrder,
  deleteItemOrder,
  deleteAllItemOrders,
  getOrders,
  Itemupdate
} = require("../controllers/itemController");
const ItemModel = require("../models/Itemmodel");
// const {formDel} = require("../middleware/middleware");
//create/add a item Order
router.post("/", createItemOrder);

//Delete an item order

router.post("/del", deleteItemOrder);
router.post("/itemupdate", Itemupdate);

//delete all item orders
router.post("/deleteAll", deleteAllItemOrders);

//get all item orders

router.get("/", getOrders);

module.exports = router;
