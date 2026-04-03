const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.patch('/:id', orderController.updateOrderStatus);
router.get('/track/:trackingId', orderController.trackOrder);

module.exports = router;
