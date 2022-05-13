const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/personal-page", UsersController.Personal);
// router.post("/personal-page", UsersController.AddAFriend);
// router.get("/personal-page/all-users", UsersController.AddAFriend);
router.get("/personal-page/create-a-group", UsersController.NewGroup);
// router.post("/personal-page", UsersController.CreateAGroup);

module.exports = router;