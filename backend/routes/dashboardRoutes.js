const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

router.get('/stats', orderController.getStats);
router.get('/users', userController.getAllUsers);

module.exports = router;
