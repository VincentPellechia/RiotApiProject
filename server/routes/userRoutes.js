const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/getUser", userController.getUser);
router.post("/getRank", userController.getRank);
router.post("/getChampions", userController.getChampions);
// Define other user routes here

module.exports = router;
