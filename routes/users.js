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
router.get('/groups', UsersController.ViewCalendar);
router.get('/groups/next-month', UsersController.ViewNextCalendar);
router.get('/groups/third-month', UsersController.ViewThirdCalendar);

module.exports = router;