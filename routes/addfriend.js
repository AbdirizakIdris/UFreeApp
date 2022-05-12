const express = require("express");
const router = express.Router();

const AddFriendController = require("../controllers/addfriend");

router.get("/", AddFriendController.Index);
router.post("/add", AddFriendController.Add);

module.exports = router;