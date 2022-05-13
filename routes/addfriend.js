const express = require("express");
const router = express.Router();

const AddFriendController = require("../controllers/addfriend");

router.get("/", AddFriendController.Index);
router.post("/add", AddFriendController.Add);
router.get("/add-friend-to-group", AddFriendController.AddFriendtoGroup);

module.exports = router;