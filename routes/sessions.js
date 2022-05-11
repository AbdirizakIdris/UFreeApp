const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/sessions");

router.get("/new", SessionsController.New);
router.post("/", SessionsController.Create);

module.exports = router;