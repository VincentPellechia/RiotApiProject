const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.getUser);
router.post('/getRank', userController.getRank);
// Define other user routes here

module.exports = router;